"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  getAllTranscationsSC,
  formatDateTime,
} from "@/lib/smartContractsContext";
import getProductTrackingById, { TranscationTypeSC } from "@/lib/tracking";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type res = {
  address: string;
  publicKey: string;
  actoryType: string;
  time: Date;
};
export default function ShowTracking({ productId }: { productId: string }) {
  const [data, setData] = useState<res[] | undefined>([]);
  useEffect(() => {
    async function getData() {
      const transcations = await getAllTranscationsSC();

      const data = await getProductTrackingById(productId, transcations!);
      if (!data) {
        setData([]);
        return;
      }
      setData(data);
    }
    getData();
  }, []);
  if (!data) {
    return <h1>error</h1>;
  }
  return (
    <div className="flex my-auto flex-col max-w-7xl mx-auto w-full justify-center items-center">
      <SliderComponent
        value={[
          data.length === 0
            ? 0
            : data.length === 1
            ? 10
            : data.length === 2
            ? 50
            : 100,
        ]}
        className="mt-50 w-full mx-5"
      />
      <div className="flex gap-5 w-full justify-start mt-10">
        {data && data.map((item, idx) => <PlaceCard data={item} key={idx} />)}
      </div>
    </div>
  );
}

type SliderProps = React.ComponentProps<typeof Slider>;

function SliderComponent({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[30]}
      max={100}
      disabled
      className={cn("w-[60%]", className)}
      {...props}
    />
  );
}

function PlaceCard({ data }: { data: res }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{data && data.actoryType}</CardTitle>
        <CardDescription>{data && formatDateTime(data.time)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data && data.publicKey}</p>
      </CardContent>
      <CardFooter>
        <p>{data && data.address}</p>
      </CardFooter>
    </Card>
  );
}
