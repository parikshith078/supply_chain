"use client";
import Image from "next/image";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buyProductSC } from "@/lib/smartContractsContext";
import { useRouter } from "next/navigation";
export default function TabContentList({
  data,
  category,
}: {
  data: {
    category: string;
    name: string;
    discription: string;
    dateOfHarvest: Date;
    price: number;
    id: string;
    quantity: number;
    ownerId: string;
  }[];
  category: string;
}) {
  const router = useRouter();
  return (
    <TabsContent value={category}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Market Place</CardTitle>
          <CardDescription>See all products in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Harvest date</TableHead>
                <TableHead className="hidden md:table-cell">Price/kg</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, id) => (
                <TableRow
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push(`/market/${item.id}`);
                  }}
                  key={id}
                >
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/placeholder.svg"
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.dateOfHarvest.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ETH {item.price}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={async () => {
                        await buyProductSC(
                          item.id,
                          new Date().getTime(),
                          item.price.toString()
                        );
                      }}
                    >
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export function categorizeProducts(data: any): { [key: string]: object[] } {
  const categorizedProducts: { [key: string]: object[] } = {
    GRAINS: [],
    VEGETABLES: [],
    FRUITS: [],
  };

  data.forEach(
    (item: {
      category: string;
      name: string;
      discription: string;
      dateOfHarvest: Date;
      price: number;
      id: string;
      quantity: number;
      ownerId: string;
    }) => {
      const categoryUpperCase = item.category.toUpperCase();
      if (categoryUpperCase === "GRAINS") {
        categorizedProducts["GRAINS"].push({
          id: item.id,
          name: item.name,
          discription: item.discription,
          price: item.price,
          dateOfHarvest: item.dateOfHarvest,
          quantity: item.quantity,
          ownerId: item.ownerId,
        });
      } else if (categoryUpperCase === "VEGETABLES") {
        categorizedProducts["VEGETABLES"].push({
          id: item.id,
          name: item.name,
          discription: item.discription,
          price: item.price,
          dateOfHarvest: item.dateOfHarvest,
          quantity: item.quantity,
          ownerId: item.ownerId,
        });
      } else if (categoryUpperCase === "FRUITS") {
        categorizedProducts["FRUITS"].push({
          id: item.id,
          name: item.name,
          discription: item.discription,
          price: item.price,
          dateOfHarvest: item.dateOfHarvest,
          quantity: item.quantity,
          ownerId: item.ownerId,
        });
      }
    }
  );

  return categorizedProducts;
}
