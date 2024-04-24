import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { currentUser } from "@clerk/nextjs";
import TabContentList, {
  categorizeProducts,
} from "../_components/TabContentListInventory";

async function getUserOwnedProducts(id: string) {
  "use server";
  const data = await prisma.product.findMany({
    where: {
      ownerId: id,
    },
  });
  return data;
}

enum Category {
  FRUITS = "FRUITS",
  VEGETABLES = "VEGETABLES",
  GRAINS = "GRAINS",
}

export default async function Dashboard() {
  const user = await currentUser().catch((err) => console.error(err));
  const res = await getUserOwnedProducts(
    user!.publicMetadata.recordId as string
  );
  const data = categorizeProducts(res);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue={Category.GRAINS}>
          <div className="flex items-center justify-between p-5">
            <TabsList>
              <TabsTrigger value={Category.GRAINS}>Grains</TabsTrigger>
              <TabsTrigger value={Category.VEGETABLES}>Vegitables</TabsTrigger>
              <TabsTrigger value={Category.FRUITS}>Fruites</TabsTrigger>
            </TabsList>
            <Button asChild>
              {user?.publicMetadata.actorType == "FARMER" ? (
                <Link href="/product-catalog">Add products</Link>
              ) : (
                <Link href="/market">Go to Market</Link>
              )}
            </Button>
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
