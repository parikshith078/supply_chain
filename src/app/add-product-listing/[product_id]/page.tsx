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
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgeStore";

export default function CreateProductListing({
  params,
}: {
  params: { product_id: string };
}) {
  const { edgestore } = useEdgeStore();
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false)
  return (
    // TODO: Handle form validation
    <Card className="mx-auto max-w-sm my-auto">
      <CardHeader>
        <CardTitle className="text-xl">Create product listing</CardTitle>
        <CardDescription>
          Enter your product details and get it listed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-10"
          action={async (formData: FormData) => {
            setLoading(true)
            const image = formData.get("image") as File;
            console.log("image from client: ", image);
            const res = await edgestore.publicFiles.upload({file: image});
            console.log('image url: ', res.url)
            await createProductAction(formData, date as Date, res.url);
            setLoading(false)
          }}
        >
          <Label>Description</Label>
          <Textarea name="discription" placeholder="hello here" />
          <Input type="hidden" name="productId" value={params.product_id} />
          <Label>Price</Label>
          <Input type="number" name="price" />
          <Label>Total stock</Label>
          <Input type="number" name="stock" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
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
          <Input accept="image/*" type="file" name="image" />
          <Button disabled={loading} >Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
