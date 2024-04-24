import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

export const Rows: React.FC<Transcation> = ({ timeStamp, seller, amount }) => {
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
  const timestampNumber = Number(timeStamp);
  const date = new Date(timestampNumber);
  //
  // Format the date to a human-readable string
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{seller}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {formatDateTime(date)}
        </div>
      </TableCell>
      <TableCell className="text-right">Eth {amount}</TableCell>
    </TableRow>
  );
};


export type Transcation = {
  productId: string;
  seller: string;
  buyyer: string;
  amount: string;
  timeStamp: string;
};
