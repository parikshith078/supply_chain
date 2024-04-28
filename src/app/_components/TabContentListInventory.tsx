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
import { toggleInventory } from "@/actions/getData";
import { useState } from "react";
import Link from "next/link";
export default function TabContentList({
  data,
  status,
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
    isAvialable: boolean;
  }[];
  status: string;
}) {
  const [loading, setLoding] = useState(false);
  return (
    <TabsContent value={status}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
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
                    <Badge variant="outline">{status}</Badge>
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
                        setLoding(true);
                        await toggleInventory(item.id, item.isAvialable);
                        setLoding(false);
                      }}
                      disabled={loading}
                    >
                      {loading ? "Toggle..." : "Toggle"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link href={`/inventory/${item.id}`}>
                      <Button variant="outline" disabled={loading}>
                        Edit
                      </Button>
                    </Link>
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
