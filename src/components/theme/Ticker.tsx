import { getAllPost } from "@/services";
import { buildUrl } from "@/lib/builder";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function Ticker({}: Props) {
  const postData = await getAllPost({ limit: 10 });
  const posts = postData.posts;

  const postsWithUrls = await Promise.all(
    posts?.map(async (post: any) => {
      const url = await buildUrl(post?._id);
      return { ...post, url };
    }),
  );
  return (
    <div className="flex h-7 w-full items-center overflow-hidden bg-blue-300">
      <div className="relative top-0 flex min-w-fit border-r-2 bg-red-600 p-3 font-semibold">
        <TrendingUp className="mr-2" />
        Breaking News
      </div>

      <div className="overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap py-12 text-black">
          {postsWithUrls &&
            postsWithUrls?.map((post: any, index: any) => (
              <Link
                href={post?.url || "URL creation failed"}
                className="pr-6 hover:underline"
                key={index}
              >
                {post.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
