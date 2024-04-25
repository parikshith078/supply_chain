"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getMarketProducts } from "@/actions/getData";
import TabContentList, {
  categorizeProducts,
} from "../_components/TabContentList";

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
        const data = await getMarketProducts();
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
