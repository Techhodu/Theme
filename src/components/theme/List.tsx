import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDateTime } from "@/lib/formate";
import cover from "@/assets/images/cover.png";
import { buildUrl } from "@/lib/builder";

type Props = {
  post?: any; // Optional prop
  cat_subCat_slug: string; // Optional prop
};

export default async function List({ post, cat_subCat_slug }: Props) {
  const url = await buildUrl(post._id);
  post = { ...post, url };
  return (
    <>
      {post && (
        <article className="group relative col-span-1  overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
          <Link
            href={`${post.url || "URL creation failed"}`}
            className="absolute inset-0 z-10"
          >
            <span className="sr-only">Read article</span>
          </Link>

          <Image
            src={post?.image?.url || cover}
            alt={post?.image?.title || "Article Image"}
            width="300"
            height="200"
            className="h-52 w-full object-cover transition-all duration-300 group-hover:scale-105"
            style={{ aspectRatio: "300/200", objectFit: "cover" }}
          />

          <div className="space-y-2 bg-background p-4">
            <h3 className="text-lg font-semibold">
              {post?.title || "Default Title"} {/* Dynamic or fallback */}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {/* <div>{post?.author || "Unknown Author"}</div>{" "} */}
              {/* Dynamic author */}
              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              <div>
                {formatDateTime(post?.createdAt) || "Unknown Date"}
              </div>{" "}
              {/* Dynamic date */}
            </div>
            <p className="line-clamp-3 text-muted-foreground">
              {post?.summary || "No summary available."}{" "}
              {/* Dynamic or fallback excerpt */}
            </p>
          </div>
        </article>
      )}
    </>
  );
}
