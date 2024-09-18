import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface RawBlockData {
  html: string;
  className?: string;
  key?: string;
}
export interface RawType {
  data: RawBlockData;
  className?: string;
}

export function RawBlock({ data, className }: RawType) {
  return (
    <div className={cn("w-full", className)}>
      {data?.html && HTMLReactParser(data?.html)}
    </div>
  );
}
