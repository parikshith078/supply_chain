"use client";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/actions/getData";

enum Category {
  FRUITS = "FRUITS",
  VEGETABLES = "VEGETABLES",
  GRAINS = "GRAINS",
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    async function getData() {
      try {
        const data = await getAllProducts();
        const compile = categorizeProducts(data);
        setData(compile);
      } catch (err) {
        console.log("Error while fetching data: ", err);
      }
    }
    getData();
  }, []);
  if (data == null) return <h1>Loading...</h1>;
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue={Category.GRAINS}>
          {/* TODO: Update tab list */}
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value={Category.GRAINS}>Grains</TabsTrigger>
              <TabsTrigger value={Category.VEGETABLES}>Vegitables</TabsTrigger>
              <TabsTrigger value={Category.FRUITS}>Fruites</TabsTrigger>
            </TabsList>
          </div>
          <TabContentList
            data={data[Category.GRAINS] as any}
            category={Category.GRAINS}
          />
          <TabContentList
            data={data[Category.VEGETABLES] as any}
            category={Category.VEGETABLES}
          />
          <TabContentList
            data={data[Category.FRUITS] as any}
            category={Category.FRUITS}
          />
        </Tabs>
      </main>
    </div>
  );
}

const TabContentList = ({
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
}) => {
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
                <TableRow key={id}>
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
                    <Button>Buy</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

function categorizeProducts(data: any): { [key: string]: object[] } {
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
