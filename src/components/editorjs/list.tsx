import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface ListBlockData {
  style: "ordered" | "unordered";
  items: NestedListItem[];
}

export type NestedListItem =
  | {
      content: string;
      items: NestedListItem[];
    }
  | string;

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="my-2">{children}</li>
);

const Group = ({
  Tag,
  items,
  className,
}: {
  Tag: keyof JSX.IntrinsicElements;
  items: NestedListItem[];
  className?: string;
}) => (
  <Tag className={cn("", className)}>
    {items.map((item, i) => (
      <Bullet key={i}>
        {typeof item === "string" ? (
          HTMLReactParser(item)
        ) : (
          <>
            {HTMLReactParser(item.content)}
            {item.items.length > 0 && (
              <Group Tag={Tag} items={item.items} className={className} />
            )}
          </>
        )}
      </Bullet>
    ))}
  </Tag>
);

export function ListBlock({
  data,
  className,
}: {
  data: ListBlockData;
  className?: string;
}) {
  const Tag = (
    data?.style === "ordered" ? "ol" : "ul"
  ) as keyof JSX.IntrinsicElements;
  const listClass = data?.style === "ordered" ? "list-decimal" : "list-disc";

  return (
    <Group Tag={Tag} items={data.items} className={cn(listClass, className)} />
  );
}
