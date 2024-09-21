import Link from "next/link";
import React from "react";
import testimg from "../../assets/images/img.jpg";
import Image from "next/image";
import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_1 from "@/components/theme/RHS_1";
import List from "@/components/theme/List";
import Blocks from "@/components/editorjs";
import { itemFinder } from "@/lib/finder";
import cover from "@/assets/images/cover.png";
import RHS_wrapper from "@/components/theme/wrappers/RHS_wrapper";
type Props = any;

export const revalidate = 60 * 15;
export default async function page({ params }: Props) {
  const post_slug = params?.post_slug;
  const post = await itemFinder(post_slug, 3, "object");
  return (
    <>
      <BreadcrumbWraper params={params} />
      <div className="mt-3 grid gap-2 lg:grid-cols-3">
        {post.title && (
          <main className="col-span-3 grid h-fit flex-row gap-3 lg:col-span-2">
            {/* Page Content */}

            <h1 className="lg:font-4xl text-3xl font-bold leading-relaxed">
              {post?.title}
            </h1>
            <p className="mt-3 font-bold leading-7 text-gray-700">
              {post?.summary}
            </p>
            <p className="mt-2 pb-2 font-semibold">
              Auther :
              <a className="font-normal" href="/category/politics">
                Ritik
              </a>
              , Last Updated :
              <span className="font-normal"> 30 Jan 2024 04:07 PM</span>
            </p>
            <Image
              src={post?.image?.url || cover}
              alt={post?.image?.title || "Article Image"}
              className=""
              width={700}
              height={400}
              priority
            />

            <Blocks blocks={post.content?.blocks || []} />

            <div className="mt-8">
              <div className="border-b">
                <h2 className="w-min whitespace-nowrap rounded-t bg-primary px-6 py-2 text-secondary">
                  Related Tag
                </h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                {post?.tags &&
                  post?.tags.map((tag: any, index: string) => (
                    <a
                      key={index}
                      className="border px-4 py-1 hover:border-border hover:bg-primary hover:text-secondary"
                      href={tag._id}
                    >
                      {tag.name}
                    </a>
                  ))}
              </div>
            </div>
          </main>
        )}
        <RHS_wrapper />
      </div>
    </>
  );
}
