import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs";
import TabContentList from "../_components/TabContentListInventory";
import { ActorType } from "@/lib/generalTypes";

async function getUserOwnedProducts(id: string) {
  "use server";
  const data = await prisma.product.findMany({
    where: {
      ownerId: id,
    },
  });
  return data;
}

export default async function Dashboard() {
  const user = await currentUser().catch((err) => console.error(err));
  const res = await getUserOwnedProducts(
    user!.publicMetadata.recordId as string
  );
  const activeProducts: any[] = [];
  const inActiveProducts: any[] = [];
  res.map((item) => {
    if (item.isAvialable) {
      activeProducts.push(item);
    } else {
      inActiveProducts.push(item);
    }
  });
  if (user?.publicMetadata.actorType == ActorType.RETAILER)
    return <h1 className="text-center text-3xl font-bold mt-32">Not authorised</h1>;
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="Active">
          <div className="flex items-center justify-between p-5">
            <TabsList>
              <TabsTrigger value="Active">Active</TabsTrigger>
              <TabsTrigger value="Inactive">Inactive</TabsTrigger>
            </TabsList>
            <Button asChild>
              {user?.publicMetadata.actorType == "FARMER" ? (
                <Link href="/product-catalog">Add products</Link>
              ) : (
                <Link href="/market">Go to Market</Link>
              )}
            </Button>
          </div>
          <TabContentList data={activeProducts} status="Active" />
          <TabContentList data={inActiveProducts} status="Inactive" />
        </Tabs>
      </main>
    </div>
  );
}
