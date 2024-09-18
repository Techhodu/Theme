export * from "./paragraph";
export * from "./code";
export * from "./raw";
export * from "./table";
export * from "./delimiter";
export * from "./embed";
export * from "./header";
export * from "./list";
export * from "./quote";
export * from "./checklist";

import React from "react";
import { ParagraphBlock } from "./paragraph";
import { TableBlock } from "./table";
import { RawBlock } from "./raw";
import { CodeBlock } from "./code";
import { DelimiterBlock } from "./delimiter";
import { EmbedBlock } from "./embed";
import { HeaderBlock } from "./header";
import { ListBlock } from "./list";
import { QuoteBlock } from "./quote";
import { ChecklistBlock } from "./checklist";

type Props = {
  blocks: Array<any>;
};

export default function Blocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block: any) => {
        const { id, type, data } = block;
        switch (type) {
          case "paragraph":
            return (
              <ParagraphBlock
                className="mt-3 leading-normal"
                key={id}
                data={data}
              />
            );
          case "table":
            return <TableBlock key={id} data={data} />;
          case "raw":
            return (
              <RawBlock className="mt-3 leading-normal" key={id} data={data} />
            );
          case "code":
            return (
              <CodeBlock className="mt-3 leading-normal" key={id} data={data} />
            );
          case "delimiter":
            return <DelimiterBlock className="mt-3" key={id} />;
          case "embed":
            return (
              <EmbedBlock
                className="mt-3 leading-normal"
                key={id}
                data={data}
              />
            );
          case "header":
            return (
              <HeaderBlock
                className="mt-3 leading-normal"
                key={id}
                data={data}
              />
            );
          case "list":
            return (
              <ListBlock
                className="ml-6 mt-3 leading-normal"
                key={id}
                data={data}
              />
            );
          case "quote":
            return (
              <QuoteBlock
                className="mt-3 leading-normal"
                key={id}
                data={data}
              />
            );
          case "checklist":
            return (
              <ChecklistBlock
                className="mt-3 leading-normal"
                key={id}
                data={data}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
