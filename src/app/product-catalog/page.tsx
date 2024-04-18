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
import Link from "next/link";
import { ProductCatalogCategoryOptions } from "@/db/pocketbase-type";
import { getAllCatalogProducts } from "@/db/pocketbase";

export default async function Dashboard() {
  const data = await getAllCatalogProducts();
  const compiledData = categorizeProducts(data);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue={ProductCatalogCategoryOptions["grains."]}>
          {/* TODO: Update tab list */}
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value={ProductCatalogCategoryOptions["grains."]}>
                Grains
              </TabsTrigger>
              <TabsTrigger value={ProductCatalogCategoryOptions.vegetables}>
                Vegitables
              </TabsTrigger>
              <TabsTrigger value={ProductCatalogCategoryOptions.fruits}>
                Fruites
              </TabsTrigger>
            </TabsList>
          </div>
          <TabContentList
            data={compiledData[ProductCatalogCategoryOptions["grains."]] as any}
            category={ProductCatalogCategoryOptions["grains."]}
          />
          <TabContentList
            data={compiledData[ProductCatalogCategoryOptions.fruits] as any}
            category={ProductCatalogCategoryOptions.fruits}
          />
          <TabContentList
            data={compiledData[ProductCatalogCategoryOptions.vegetables] as any}
            category={ProductCatalogCategoryOptions.vegetables}
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
  data: { msp: number; id: string; name: string; discription: string }[];
  category: string;
}) => {
  return (
    <TabsContent value={category}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products Catalog</CardTitle>
          <CardDescription>
            See all products in your store
          </CardDescription>
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
                <TableHead className="hidden md:table-cell">MSP/kg</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any, id) => (
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
                    <Badge variant="outline">
                      {/* TODO: Fix catagory name */}
                      {category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ₹{item.msp}
                  </TableCell>
                  <TableCell>
                    <Link href={`/add-product-listing/${item.id}`}>
                      <Button>Add Listing</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {/* TODO: Update pagination */}
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

function categorizeProducts(data: any): { [key: string]: object[] } {
  const categorizedProducts: { [key: string]: object[] } = {
    "grains.": [],
    vegetables: [],
    fruits: [],
  };

  data.items.forEach(
    (item: {
      category: string;
      name: string;
      discription: string;
      msp: number;
      id: string;
    }) => {
      if (item.category === "grains.") {
        categorizedProducts["grains."].push({
          id: item.id,
          name: item.name,
          discription: item.discription,
          msp: item.msp,
        });
      } else if (item.category === "vegetables") {
        categorizedProducts["vegetables"].push({
          id: item.id,
          name: item.name,
          discription: item.discription,
          msp: item.msp,
        });
      } else if (item.category === "fruits") {
        categorizedProducts["fruits"].push({
          id: item.id,
          name: item.name,
          discription: item.discription,
          msp: item.msp,
        });
      }
    },
  );

  return categorizedProducts;
}
