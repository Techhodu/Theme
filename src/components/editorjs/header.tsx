import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface HeaderBlockData {
  text: string;
  level: number;
}
export interface HeaderType {
  data: HeaderBlockData;
  className?: string;
}

export function HeaderBlock({ data, className }: HeaderType) {
  const Tag = `h${data?.level || 1}` as keyof JSX.IntrinsicElements;
  let headingClass = "";
  if (data?.level == 1) {
    headingClass += ` text-3xl leading-relaxed font-bold leading-normal  `;
  }
  if (data?.level == 2) {
    headingClass += "text-2xl leading-relaxed font-bold  leading-normal ";
  }
  if (data?.level == 3) {
    headingClass += "text-xl leading-relaxed font-bold  leading-normal";
  }
  if (data?.level == 4) {
    headingClass += "text-ll leading-relaxed font-bold  leading-normal";
  }
  if (data?.level == 5) {
    headingClass += "text-base leading-relaxed font-bold  leading-normal";
  }
  if (data?.level == 5) {
    headingClass += "text-sm leading-relaxed font-bold  leading-normal";
  }
  return (
    <Tag className={cn(headingClass, className)}>
      {data?.text && HTMLReactParser(data?.text)}
    </Tag>
  );
}
