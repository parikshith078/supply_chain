"use client";
import { Activity, ArrowUpRight, CreditCard, DollarSign } from "lucide-react";
import {
  SignInWithMetamaskButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Rows } from "./_components/TranscationRows";
import {
  getAllTranscationsSC,
  getTotalSellsSC,
} from "@/lib/smartContractsContext";
import { TranscationTypeSC } from "@/lib/tracking";
import { convertWeiToEth } from "@/lib/utils";
import { getNumberUsers } from "@/actions/getData";

export default function Dashboard() {
  const [transactionData, setTransactionData] = useState<
    TranscationTypeSC[] | null
  >(null);
  const [totalSells, setSells] = useState<undefined | string>("");
  const [numberOfUser, setUsers] = useState<number | undefined>(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllTranscationsSC();
        if (!data) {
          console.error("Error while fetching transcations");
          setTransactionData([]);
          return;
        }
        setTransactionData(data);
      } catch (e) {
        console.error("Error while fetching: ", e);
      }
    }
    async function fetchSellsData() {
      try {
        const data = await getTotalSellsSC();
        console.log("data", data);
        console.log(typeof data);
        if (data == undefined) {
          console.error("Error while fetching transcations");
          return;
        }
        setSells(data);
      } catch (e) {
        console.error("Error while fetching: ", e);
      }
    }
    async function fetchNumberUser() {
      try {
        const data = await getNumberUsers();
        console.log("data", data);
        console.log(typeof data);
        if (!data.ok) {
          console.error("Error while fetching transcations");
          return;
        }
        setUsers(data.count);
      } catch (e) {
        console.error("Error while fetching: ", e);
      }
    }
    fetchSellsData();
    fetchData();
    fetchNumberUser()
  }, []);
  if (transactionData == null) return <h1>Loading...</h1>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ETH {convertWeiToEth(totalSells!)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transcations</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionData.length}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfUser}</div>
            <p className="text-xs text-muted-foreground">
              +21 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 grid-cols-1 ">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions on the network.
              </CardDescription>
            </div>
            <SignedIn>
              <Button asChild className="ml-auto gap-1">
                <SignOutButton />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInWithMetamaskButton>
                <Button size="sm" className="ml-auto gap-1">
                  Login in
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </SignInWithMetamaskButton>
            </SignedOut>
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
