import { cn } from "@/lib/utils";
import HTMLReactParser from "html-react-parser";

export interface EmbedBlockData {
  service: string;
  source: string;
  embed?: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface EmbedType {
  data: EmbedBlockData;
  className?: string;
  rel?: string;
  sandbox?: string | null;
}

export function EmbedBlock({ data, className, sandbox, rel }: EmbedType) {
  const { embed, source, width, height, caption } = data;

  // Aspect ratio fallback if width and height are provided
  const aspectRatio = width && height ? (height / width) * 100 : 56.25; // Default to 16:9 aspect ratio

  const figureProps = {
    width: width?.toString(),
    height: height?.toString(),
    sandbox: sandbox || undefined,
  };

  return (
    <figure className="flex w-full justify-center">
      <div className="w-full max-w-4xl">
        {embed ? (
          <div
            className="relative w-full"
            style={{ paddingBottom: `${aspectRatio}%` }}
          >
            <iframe
              className={cn("absolute left-0 top-0 h-full w-full", className)}
              src={embed}
              {...figureProps}
              frameBorder="0"
              data-src={source}
            ></iframe>
          </div>
        ) : (
          <a
            href={source}
            target="_blank"
            rel={rel}
            className="block w-full text-center"
          >
            {source}
          </a>
        )}
        {caption && (
          <figcaption className="my-1 border p-3 text-center">
            {HTMLReactParser(caption)}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
