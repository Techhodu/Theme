import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";
import { Checkbox } from "@/components/ui/checkbox";

export interface ChecklistType {
  data: Items;
  className?: string;
}

export interface Items {
  items: ChecklistBlockData[];
}

export interface ChecklistBlockData {
  text: string;
  checked: boolean;
}

export function ChecklistBlock({ data, className }: ChecklistType) {
  console.log(data.items); // Just for debugging, you can remove this line in production

  return (
    <>
      {data?.items.map((item, index) => (
        <div
          key={index}
          className={cn("flex items-center space-x-2 my-2" , className)}
        >
          <Checkbox
            id={`checkbox_${index}`} // Ensure each checkbox has a unique ID
            checked={item.checked}
            disabled={!item.checked} // Adjust this logic as needed
          />
          <label
            htmlFor={`checkbox_${index}`}
            className="text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.text}
          </label>
        </div>
      ))}
    </>
  );
}
