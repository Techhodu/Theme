import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface ADBlockData {
  text: string;
  key?: string;
}
export interface ADType {
  data: ADBlockData;
  className?: string;
}
export function ADBlock({ data, className }: ADType) {
  return (
    <div className={cn("w-full h-fit", className)}>
      {data?.text && HTMLReactParser(data?.text)}
    </div>
  );
}
