import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface QuoteBlockData {
  text: string;
  caption?: string;
  alignment?: "left" | "center";
}
export interface QuoteType {
  data: QuoteBlockData;
  className?: string;
}

export function QuoteBlock({ data, className }: QuoteType) {
  const blockquoteClass = `  mt-6 border-l-2 pl-6 italic text-align-${data?.alignment}`;

  return (
    <blockquote className={cn(blockquoteClass, className)}>
      {data?.text &&
        data.text
          .split("\n\n")
          .map((paragraph, i) => (
            <p key={i}>
              {HTMLReactParser(
                paragraph
                  .split("\n")
                  .reduce((total, line) => [total, "<br />", line].join("")),
              )}
            </p>
          ))}
      {data?.caption && <footer className="text-lg font-bold">{HTMLReactParser(data.caption)}</footer>}
    </blockquote>
  );
}
