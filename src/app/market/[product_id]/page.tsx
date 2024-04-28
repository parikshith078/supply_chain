"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import error from "next/error";
import { ChangeEvent, useEffect, useState } from "react";
import { getOwnerDetailsById, getProductDetailsById } from "@/actions/getData";
import ShowTracking from "@/app/_components/ShowTracking";
import { buyProductSC } from "@/lib/smartContractsContext";
import { useUser } from "@clerk/nextjs";
import { ActorType } from "@/lib/generalTypes";

type Response = {
  id: string;
  discrption: string;
  name: string;
  category: string;
  dateOfHarvest: Date;
  isAvialable: boolean;
  price: number;
  quantity: number;
  imageUrl: string;
  catalogId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

type OwnerDetailsType = {
  ok: boolean;
  data: {
    id: string;
    name: string;
    actorType: string;
    address: string;
    publicKey: string;
    email: string;
    updatedAt: Date;
    createdAt: Date;
  };
};
export default function Dashboard({
  params,
}: {
  params: { product_id: string };
}) {
  const siteUrl = "http://localhost:3000";
  const [productData, setData] = useState<Response | undefined>(undefined);
  const [ownerData, setOwerData] = useState<undefined | OwnerDetailsType>(
    undefined
  );

  const { user } = useUser();
  useEffect(() => {
    async function getData() {
      const res = await getProductDetailsById(params.product_id);
      if (!res) {
        console.log("error while fetching");
        return;
      }
      console.log(res);
      const ownerDetails = await getOwnerDetailsById(res?.ownerId);
      if (!ownerDetails.ok) {
        console.log("error while fetching");
        return;
      }
      setOwerData(ownerDetails as OwnerDetailsType);
      setData(res);
    }
    getData();
  }, []);

  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>{productData && productData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product QR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="150"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                          siteUrl + pathname
                        }`}
                        width="150"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>
                      Product Name: {productData && productData.name}
                    </CardTitle>
                    <CardDescription>
                      Product Category: {productData && productData.category}
                    </CardDescription>
                    {error && <CardDescription></CardDescription>}
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description:</Label>
                        <Textarea
                          id="description"
                          className="min-h-32 disabled:font-bold disabled:text-black"
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          readOnly={true}
                          value={productData && productData.discrption}
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Seller: </Label>
                        <Input
                          id="name"
                          disabled
                          value={ownerData && ownerData.data.publicKey}
                          type="text"
                          className="w-full disabled:font-bold disabled:text-black"
                          placeholder="Mark"
                          readOnly={true}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Origin: </Label>
                        <Input
                          id="name"
                          type="text"
                          value={ownerData && ownerData.data.address}
                          className="w-full disabled:font-bold disabled:text-black"
                          placeholder="Address"
                          readOnly={true}
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Contact Info: {}</Label>
                        <Input
                          id="name"
                          type="mail"
                          value={ownerData && ownerData.data.email}
                          className="w-full disabled:font-bold disabled:text-black"
                          placeholder="mark@gmail.com"
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Price</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full disabled:font-bold disabled:text-black"
                          placeholder="$100"
                          value={productData && productData.price}
                          disabled
                        />
                      </div>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Quantity</Label>
                          <Input
                            id="name"
                            type="text"
                            value={productData && productData.quantity}
                            className="w-full disabled:font-bold disabled:text-black"
                            placeholder="In Stock"
                            disabled
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="name">Date of Harvest</Label>
                          <Input
                            id="name"
                            type="date"
                            value={
                              productData &&
                              productData.dateOfHarvest
                                .toISOString()
                                .substr(0, 10)
                            }
                            className="w-full disabled:font-bold disabled:text-black"
                            placeholder="DD-MM-YYYY"
                            disabled
                          />
                        </div>
                        {productData && (
                          <Button
                            onClick={async () => {
                              if (!user) {
                                alert("Not Authorised");
                                return;
                              }
                              if (
                                user.publicMetadata.actorType ==
                                ActorType.RETAILER
                              ) {
                                alert("Not Authorised");
                                return;
                              }
                              try {
                                await buyProductSC(
                                  productData?.id,
                                  new Date().getTime(),
                                  productData?.price.toString()
                                ).then(() => {
                                  toast({
                                    description:
                                      "Your purchase has been confirmed.",
                                  });
                                });
                              } catch (e) {
                                console.error("Error while buying :", e);
                              }
                            }}
                          >
                            Buy Product
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <ShowTracking productId={params.product_id} />
      </div>
    </div>
  );
}
