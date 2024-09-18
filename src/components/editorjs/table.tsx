import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

type Row = string[];
type Content = Row[];

export interface TableBlockData {
  content: Content;
  withHeadings?: boolean;
  header?: string[];
  footer?: string[];
  caption?: string;
}
export interface TableType {
  className?: string;
  data: TableBlockData;
}

export  function TableBlock({ data, className }: TableType) {
  const content = data?.withHeadings ? data?.content.slice(1) : data?.content;
  const header = data?.withHeadings ? data?.content[0] : data?.header;
  const withRowHeadings = !!data?.header;
  return (
    <Table className={cn("border", className)}>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      {data.withHeadings && (
        <TableHeader>
          <TableRow>
            {header?.map((cell, i) => (
              <TableHead key={cell}  className=""> {HTMLReactParser(cell)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {content?.map((row, i) => (
          <TableRow key={row.toString()} className="">
            {row.map((rowdata) => (
              <TableCell key={rowdata} className="font-medium">
                {HTMLReactParser(rowdata)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
