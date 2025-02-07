import Link from "next/link";
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { postDetails } from "@/services";
import Blocks from "@/components/editorjs";
import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_wrapper from "@/components/theme/wrappers/RHS_wrapper";
import cover from "@/assets/images/cover.png";
import logo from "@/assets/images/logo.png";
import { formatDateTime } from "@/lib/formate";
import MGIDWidget from "@/components/ads/mgid";
import type { Metadata, ResolvingMetadata } from "next";

interface PostTag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
}

interface PostImage {
  url: string;
  title: string;
}

interface Post {
  title: string;
  summary: string;
  image: PostImage;
  createdBy: Author;
  publicAt: string;
  content: {
    blocks: any[];
  };
  tags: PostTag[];
}

interface Props {
  params: {
    cat_page_slug: string;
    subCat_post_slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await postDetails(params.subCat_post_slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.image?.url || logo.src }],
    },
  };
}

export const revalidate = 60 * 15; // 15 minutes

const PostPage: React.FC<Props> = async ({ params }) => {
  const slug = params?.subCat_post_slug;
  const id = slug?.split("-")?.pop();
  const postData = await postDetails(id);
  const post: Post = postData?.post;

  if (!post) {
    notFound();
  }

  return (
    <>
      <BreadcrumbWraper params={params} />
      <div className="mt-3 grid min-h-screen gap-4 lg:grid-cols-3">
        <main className="col-span-3 space-y-6 lg:col-span-2">
          <article>
            <header className="space-y-4">
              <h1 className="text-3xl font-bold leading-relaxed lg:text-4xl">
                {post.title}
              </h1>

              <p className="text-lg font-bold leading-7 text-gray-700">
                {post.summary}
              </p>

              <div className="text-sm text-gray-600">
                <span className="font-semibold">Author: </span>
                <Link
                  href={`/author/${post?.createdBy?._id}`}
                  className="hover:text-primary"
                >
                  {post?.createdBy?.name}
                </Link>
                <span className="mx-2">•</span>
                <span className="font-semibold">Last Updated: </span>
                <time dateTime={post.publicAt}>
                  {formatDateTime(post.publicAt)}
                </time>
              </div>
            </header>

            <div className="relative my-6 aspect-video w-full">
              <Image
                src={post.image?.url || cover}
                alt={post.image?.title || "Article Image"}
                fill
                className="object-cover"
                priority
              />
            </div>

            <MGIDWidget widgetId="1725109" />

            {post.content?.blocks?.length > 0 && (
              <div className="my-8">
                <Blocks blocks={post.content.blocks} />
              </div>
            )}

            <MGIDWidget widgetId="1725138" />

            {post.tags?.length > 0 && (
              <section className="mt-12">
                <div className="border-b">
                  <h2 className="w-min whitespace-nowrap rounded-t bg-primary px-6 py-2 text-secondary">
                    Related Tags
                  </h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {post.tags.map((tag: PostTag) => (
                    <Link
                      key={tag._id}
                      href={`/tags/${tag._id}`}
                      className="border px-4 py-2 transition-colors hover:border-border hover:bg-primary hover:text-secondary"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>

        <RHS_wrapper />
      </div>
    </>
  );
};

export default PostPage;
