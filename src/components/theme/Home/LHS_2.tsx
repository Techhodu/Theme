import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import cover from "../../../assets/images/cover.png";
import { getAllPost } from "@/services";
import { formatDateTime } from "@/lib/formate";
import { buildUrl } from "@/lib/builder";

type Props = {
  limit?: number;
  category?: string;
  slug: string;
  category_title: string;
};
export default async function LHS_2(Props: Props) {
  const postData = await getAllPost(Props);
  const posts: [any] = postData.posts || [];

  const postsWithUrls = await Promise.all(
    posts?.map(async (post: any) => {
      const url = await buildUrl(post?._id);
      return { ...post, url };
    })
  );
  return (
    <div className="grid grid-cols-6 gap-3 bg-muted/85 p-3 shadow-lg">
      <Link className="col-span-6" href={`/${Props?.slug}`}>
        <div className="flex w-full items-center justify-between">
          <h3 className="text-2xl font-semibold">{Props?.category_title}</h3>
          <div className="min-w-fit rounded-full border px-2 bg-primary/50">
            View More
          </div>
        </div>
      </Link>

      {postsWithUrls &&
        postsWithUrls.map((post: any, index: number) =>
          index === 0 ? (
            <Link
              href={post?.url || "URL creation failed"}
              key={index}
              className="col-span-6 grid grid-cols-5 gap-3"
            >
              <div className="relative col-span-5 w-full md:col-span-3">
                <Image
                  className="max-h-[240px] w-full rounded object-cover md:col-span-1"
                  src={post?.image?.url || cover}
                  alt={post?.image?.title}
                  width={300}
                  height={240}
                />
              </div>
              <div className="col-span-5 md:col-span-2">
                <h6 className="text-xs font-semibold tracking-tight text-gray-600">
                  {formatDateTime(post?.publicAt)}
                </h6>
                <h3 className="my-2 line-clamp-2 text-3xl font-medium leading-tight tracking-tight lg:text-3xl">
                  {post?.title}
                </h3>
                <h4 className="line-clamp-4 text-base tracking-tight text-muted-foreground">
                  {post?.summary}
                </h4>
              </div>
            </Link>
          ) : (
            <Link
              className="col-span-6 md:col-span-2"
              href={post?.url || "URL creation failed"}
              key={index}
            >
              <div className="col-span-2 grid h-20 grid-cols-3 gap-3 overflow-hidden rounded sm:col-span-1">
                <div className="col-span-1 h-full w-full overflow-hidden rounded">
                  <Image
                    className="h-full w-full object-cover"
                    src={post?.image?.url || cover}
                    alt={post?.image?.title}
                    width={100}
                    height={80}
                  />
                </div>
                <div className="col-span-2">
                  <h3 className="mb-2 line-clamp-3 text-base font-medium tracking-tight lg:text-base">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          )
        )}
    </div>
  );
}
