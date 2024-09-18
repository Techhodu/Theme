import { cn } from "@/lib/utils";

export interface DelimiterType {
  className?: string;
}

export function DelimiterBlock({ className }: DelimiterType) {
  return <hr className={cn("", className)} />;
}
