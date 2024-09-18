"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface codeType {
  data: codeBlockData;
  className?: string;
}
export interface codeBlockData {
  code: string;
  lang?: string;
}

export function CodeBlock({ data, className }: codeType) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (data?.code) {
      navigator.clipboard.writeText(data.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-x-auto">
      <Button
        size="sm"
        className="absolute right-2 top-4 bg-secondary/80"
        variant="ghost"
        onClick={handleCopy}
      >
        {isCopied ? (
          <CopyCheck className="mr-2 h-4 w-4" />
        ) : (
          <Copy className="mr-2 h-4 w-4" />
        )}
        {isCopied ? "Copied!" : "Copy"}
      </Button>
      <pre
        className={cn(
          "w-full max-w-full overflow-x-auto rounded-sm bg-primary p-3 text-sm text-secondary md:text-base lg:text-lg",
          className,
        )}
      >
        {data?.code && <code>{data.code}</code>}
      </pre>
    </div>
  );
}

// import { cn } from "@/lib/utils";
// import HTMLReactParser from "html-react-parser";

// export interface codeType {
//   data: codeBlockData;
//   className?: string;
// }
// export interface codeBlockData {
//   code: string;
//   lang?: string;
// }
// export function CodeBlock({ data, className }: codeType) {
//   return (
//     <pre className={cn("rounded-sm bg-primary p-3 text-secondary", className)}>
//       {data?.code && <code>{data.code}</code>}
//     </pre>
//   );
// }
