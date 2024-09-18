import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface ParagraphBlockData {
  text: string;
  key?: string;
}
export interface ParagraphType {
  data: ParagraphBlockData;
  className?: string;
}

export  function ParagraphBlock({ data, className }: ParagraphType) {
  return (
    <p className={cn("", className)}>
      {data?.text && HTMLReactParser(data?.text)}
    </p>
  );
}
