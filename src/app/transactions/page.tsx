"use client";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllTranscationsSC } from "@/lib/smartContractsContext";
import { useEffect, useState } from "react";
import { Rows, Transcation } from "../_components/TranscationRows";
// import { Transation, getTransactions } from "@/lib/generateFakeData";


export default function Dashboard() {
  //TODO: Add filter to transcations
  const [transactionData, setTransactionData] = useState<Transcation[] | null>(
    null
  );
  useEffect(() => {
    async function fetchData() {
      const data = (await getAllTranscationsSC()) as Transcation[];
      setTransactionData(data);
    }
    fetchData();
  }, []);
  if (transactionData == null) return <h1>Loading...</h1>;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8 grid-cols-1 ">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Your recent transcations</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((val, id) => (
                  <Rows key={id} {...val} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


