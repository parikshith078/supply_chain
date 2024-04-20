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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Transation, getTransactions } from "@/lib/generateFakeData";

export default function Dashboard() {
  //TODO: Add fetch total revenue and sales data from the smart contract.
  const [transactionData, setTransactionData] = useState<Transation[]>([]);
  useEffect( () => {
    async function fetchData() {
      const data = getTransactions(10);
      // console.log(data);
      setTransactionData(data);
    }
    fetchData();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
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
            {/*TODO: Add a action button here */}
            <SignedIn>
              <Button asChild className="ml-auto gap-1">
                <SignOutButton />
                {/* <Link href="/orders"> */}
                {/*   See orders */}
                {/*   {/* <ArrowUpRight className="h-4 w-4" /> */}
                {/* </Link> */}
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
                  <Rows
                    key={id}
                    id={val.id}
                    time={val.time}
                    amount={val.amount}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

const Rows: React.FC<Transation> = ({ id, time, amount }) => {
  function formatDateTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  }

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{id}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {formatDateTime(time)}
        </div>
      </TableCell>
      <TableCell className="text-right">${amount}</TableCell>
    </TableRow>
  );
};
