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
import { prisma } from "@/db/client";


async function getAllCatalogProducts() {
  "use server"
  const data = prisma.catalog.findMany()
  return data
}
enum Category {
    FRUITS = "FRUITS",
    VEGETABLES = "VEGETABLES",
    GRAINS = "GRAINS"
}


export default async function Dashboard() {
  // const data = await getAllCatalogProducts();
  // const compiledData = categorizeProducts(data);
  // const compiledData = categorizeProducts(data);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue={Category.GRAINS}>
          {/* TODO: Update tab list */}
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value={Category.GRAINS}>
                Grains
              </TabsTrigger>
              <TabsTrigger value={Category.VEGETABLES}>
                Vegitables
              </TabsTrigger>
              <TabsTrigger value={Category.FRUITS}>
                Fruites
              </TabsTrigger>
            </TabsList>
          </div>
          {/* <TabContentList */}
          {/*   data={compiledData[Category.GRAINS] as any} */}
          {/*   category={Category.GRAINS} */}
          {/* /> */}
          {/* <TabContentList */}
          {/*   data={compiledData[Category.VEGETABLES] as any} */}
          {/*   category={Category.VEGETABLES} */}
          {/* /> */}
          {/* <TabContentList */}
          {/*   data={compiledData[Category.FRUITS] as any} */}
          {/*   category={Category.FRUITS} */}
          {/* /> */}
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
    //   {
    //   id: 'adac9a49-4f32-4bcc-b1b9-bc302ba4ddec',
    //   name: 'Water melones',
    //   discription: 'testing the water melon',
    //   msp: 90
    // }

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
    "GRAINS": [],
    "VEGETABLES": [],
    "FRUITS": [],
  };

  data.forEach((item: {
    category: string;
    name: string;
    discription: string;
    msp: number;
    id: string;
  }) => {
    const categoryUpperCase = item.category.toUpperCase();
    if (categoryUpperCase === "GRAINS") {
      categorizedProducts["GRAINS"].push({
        id: item.id,
        name: item.name,
        discription: item.discription,
        msp: item.msp,
      });
    } else if (categoryUpperCase === "VEGETABLES") {
      categorizedProducts["VEGETABLES"].push({
        id: item.id,
        name: item.name,
        discription: item.discription,
        msp: item.msp,
      });
    } else if (categoryUpperCase === "FRUITS") {
      categorizedProducts["FRUITS"].push({
        id: item.id,
        name: item.name,
        discription: item.discription,
        msp: item.msp,
      });
    }
  });

  return categorizedProducts;
}

