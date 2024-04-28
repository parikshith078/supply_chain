import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/smartContractsContext";
import { TranscationTypeSC } from "@/lib/tracking";

export const Rows: React.FC<TranscationTypeSC> = ({ timeStamp, seller, amount }) => {
  const timestampNumber = timeStamp;
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


