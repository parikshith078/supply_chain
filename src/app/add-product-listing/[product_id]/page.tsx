"use client";

import { createProductAction } from "@/actions/createListing";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
// import { useEdgeStore } from "@/lib/edgeStore";
import { getCatalogProductById } from "@/actions/register";
import { useRouter } from "next/navigation";

// async function handleSumit() {
//   // await createProductAction(, date as Date, res.url);
// }

export default function CreateProductListing({
  params,
}: {
  params: { product_id: string };
}) {
  const [formData, setFormData] = useState({
    price: "",
    stock: "",
    discription: "",
  });

  const router = useRouter();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const { edgestore } = useEdgeStore();
  const [error, setError] = useState<string | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<any>();
  useEffect(() => {
    async function getData() {
      const data = await getCatalogProductById(params.product_id);
      if (data) {
        // TODO: Add transcation fetch from smart contract
        setCatalogProduct(data);
      }
    }
    getData();
  }, []);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  if (!catalogProduct) return <h1>Error while fetching data</h1>;
  return (
    // TODO: Handle form validation
    <Card className="mx-auto max-w-sm my-auto">
      <CardHeader>
        <CardTitle className="text-xl">Name: {catalogProduct.name}</CardTitle>
        <CardDescription>Category: {catalogProduct.category}</CardDescription>
        {error && (
          <CardDescription className="text-md text-destructive">
            {error}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-10">
          <Label>Description</Label>
          <Textarea
            value={formData.discription}
            onChange={handleInputChange}
            name="discription"
            placeholder="hello here"
          />
          <Input type="hidden" name="productId" value={params.product_id} />
          <Input
            type="hidden"
            name="category"
            value={catalogProduct.category}
          />
          <Input type="hidden" name="name" value={catalogProduct.name} />
          <Label>Price</Label>
          <Input
            value={formData.price}
            onChange={handleInputChange}
            type="number"
            name="price"
          />
          <Label>Total stock</Label>
          <Input
            value={formData.stock}
            onChange={handleInputChange}
            type="number"
            name="stock"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* <Input */}
          {/*   accept="image/*" */}
          {/*   type="file" */}
          {/*   name="image" */}
          {/* /> */}
          <Button
            onClick={async (e) => {
              setError(null);
              if (!date) {
                setError("Please select date");
              }
              if (
                formData.stock == "" ||
                formData.price == "" ||
                formData.discription == ""
              ) {
                setError("Please fill all details");
              }
              e.preventDefault();
              setLoading(true);
              console.log(formData);
              console.log(date);
              try {
                await createProductAction(formData, date!, {
                  catelogId: params.product_id,
                  category: catalogProduct.category,
                  name: catalogProduct.name,
                }).then(() => {
                  router.push("/");
                });
              } catch (err) {
                console.error("Error while createing: ", err);
              }
              setLoading(false);
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
