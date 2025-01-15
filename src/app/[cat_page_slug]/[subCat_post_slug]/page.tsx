import Link from "next/link";
import React from "react";
import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_1 from "@/components/theme/RHS_1";
import List from "@/components/theme/List";
import { itemFinder } from "@/lib/finder";
import { getAllPost, getStaticPages, postDetails } from "@/services";
import Blocks from "@/components/editorjs";
import cover from "@/assets/images/cover.png";
import logo from "@/assets/images/logo.png";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import RHS_wrapper from "@/components/theme/wrappers/RHS_wrapper";
import type { Metadata, ResolvingMetadata } from "next";
import { formatDateTime } from "@/lib/formate";
import MGIDWidget from "@/components/ads/mgid";
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const subCat_post_slug = params.subCat_post_slug;
  const subCatPostData = await itemFinder(subCat_post_slug, 2, "object");

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: subCatPostData?.title,
    description: subCatPostData?.summary,
    openGraph: {
      images: [subCatPostData?.image?.url || logo],
    },
  };
}

type PostsDataType = {
  posts?: any[];
  Pagination?: {
    pageCount?: number;
    count?: number;
  };
};

type PostDataType = any;

type Props = {
  params: {
    cat_page_slug: string;
    subCat_post_slug: string;
  };
  searchParams: {
    page?: string;
  };
};

export const revalidate = 60 * 15;
const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const currentListPage = Number(searchParams?.page) || 1;

  const catPageSlug = params.cat_page_slug;

  const subCat_post_slug = params?.subCat_post_slug;

  const subCatPostData = await itemFinder(subCat_post_slug, 2, "object");

  let postsData: PostsDataType = {};
  let post: PostDataType = {};

  if (subCatPostData?.type === "subCategory") {
    postsData = await getAllPost({
      limit: 10,
      subCategory: subCatPostData?._id,
    });
  } else {
    post = subCatPostData || {};
  }

  const pageCount = Number(postsData?.Pagination?.pageCount) || 1;

  return (
    <>
      <BreadcrumbWraper params={params} />
      <div className="mt-3 grid min-h-screen gap-2 lg:grid-cols-3">
        {postsData.posts && (
          <main className="col-span-3 grid h-fit flex-row gap-3 md:grid-cols-2 lg:col-span-2">
            {postsData.posts?.map((post, index) => (
              <List key={index} post={post} cat_subCat_slug={catPageSlug} />
            ))}

            {pageCount > 1 && (
              <Pagination className="md:col-span-2">
                <PaginationContent>
                  {/* Previous Page Link */}
                  {currentListPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/${catPageSlug}?page=${currentListPage - 1}`}
                      />
                    </PaginationItem>
                  )}

                  {/* First Page Link */}
                  {currentListPage !== 1 && (
                    <PaginationItem>
                      <PaginationLink href={`/${catPageSlug}`}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Display Previous Page Numbers and Ellipses */}
                  {currentListPage > 2 && (
                    <>
                      {currentListPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      {currentListPage > 2 && (
                        <PaginationItem>
                          <PaginationLink
                            href={`/${catPageSlug}?page=${currentListPage - 1}`}
                          >
                            {currentListPage - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {/* Current Page */}
                  <PaginationItem>
                    <PaginationLink
                      href={`/${catPageSlug}?page=${currentListPage}`}
                      isActive
                    >
                      {currentListPage}
                    </PaginationLink>
                  </PaginationItem>

                  {/* Display Next Page Numbers and Ellipses */}
                  {currentListPage < pageCount - 1 && (
                    <>
                      {currentListPage < pageCount && (
                        <PaginationItem>
                          <PaginationLink
                            href={`/${catPageSlug}?page=${currentListPage + 1}`}
                          >
                            {currentListPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      {currentListPage < pageCount - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {/* Last Page Link */}
                  {currentListPage < pageCount && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/${catPageSlug}?page=${pageCount}`}
                      >
                        {pageCount}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Next Page Link */}
                  {currentListPage < pageCount && (
                    <PaginationItem>
                      <PaginationNext
                        href={`/${catPageSlug}?page=${currentListPage + 1}`}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </main>
        )}

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
              Author :
              <a className="font-normal" href="#">
                {"Sanjeev Singh"}
              </a>
              , Last Updated :
              <span className="font-normal">
                {formatDateTime(post?.publicAt)}
              </span>
            </p>
            <Image
              src={post?.image?.url || cover}
              alt={post?.image?.title || "Article Image"}
              className=" w-full"
              width={700}
              height={400}
              priority
            />
            <MGIDWidget widgetId="1725109" />
            <Blocks blocks={post.content?.blocks || []} />
            <MGIDWidget widgetId="1725138" />
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
                      href={`/tags/${tag._id}`}
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
};

export default Page;
