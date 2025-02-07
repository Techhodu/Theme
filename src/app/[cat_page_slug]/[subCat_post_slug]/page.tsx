import Link from "next/link";
import React from "react";
import Image from "next/image";
import { postDetails } from "@/services";
import Blocks from "@/components/editorjs";
import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_wrapper from "@/components/theme/wrappers/RHS_wrapper";
import cover from "@/assets/images/cover.png";
import logo from "@/assets/images/logo.png";
import { formatDateTime } from "@/lib/formate";
import MGIDWidget from "@/components/ads/mgid";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    cat_page_slug: string;
    subCat_post_slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await postDetails(params.subCat_post_slug);

  return {
    title: post?.title || "Default Title",
    description: post?.summary || "Default description",
    openGraph: {
      images: [post?.image?.url || logo],
    },
  };
}

export const revalidate = 60 * 15;

const Page: React.FC<Props> = async ({ params }) => {
  const post = await postDetails(params.subCat_post_slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <BreadcrumbWraper params={params} />
      <div className="mt-3 grid min-h-screen gap-2 lg:grid-cols-3">
        <main className="col-span-3 grid h-fit flex-row gap-3 lg:col-span-2">
          <h1 className="lg:font-4xl text-3xl font-bold leading-relaxed">
            {post?.title}
          </h1>
          
          <p className="mt-3 font-bold leading-7 text-gray-700">
            {post?.summary}
          </p>
          
          <p className="mt-2 pb-2 font-semibold">
            Author:{" "}
            <Link 
              href={`/author/${post?.createdBy?._id}`}
              className="font-normal"
            >
              {post?.createdBy?.name}
            </Link>
            , Last Updated:{" "}
            <span className="font-normal">
              {formatDateTime(post?.publicAt)}
            </span>
          </p>

          <Image
            src={post?.image?.url || cover}
            alt={post?.image?.title || "Article Image"}
            className="w-full"
            width={700}
            height={400}
            priority
          />

          <MGIDWidget widgetId="1725109" />
          
          {post?.content?.blocks?.length > 0 && (
            <Blocks blocks={post.content.blocks} />
          )}
          
          <MGIDWidget widgetId="1725138" />

          {post?.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <div className="border-b">
                <h2 className="w-min whitespace-nowrap rounded-t bg-primary px-6 py-2 text-secondary">
                  Related Tags
                </h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                {post.tags.map((tag: any, index: number) => (
                  <Link
                    key={index}
                    href={`/tags/${tag._id}`}
                    className="border px-4 py-1 hover:border-border hover:bg-primary hover:text-secondary"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        <RHS_wrapper />
      </div>
    </>
  );
};

export default Page;
