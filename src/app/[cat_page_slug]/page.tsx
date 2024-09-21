import Link from "next/link";
import React from "react";
import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_1 from "@/components/theme/RHS_1";
import List from "@/components/theme/List";
import { itemFinder } from "@/lib/finder";
import { getAllPost, getStaticPages } from "@/services";
import Blocks from "@/components/editorjs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RHS_wrapper from "@/components/theme/wrappers/RHS_wrapper";

type PostsDataType = {
  posts?: any[];
  Pagination?: {
    pageCount?: number;
    count?: number;
  };
};

type PageDataType = {
  title?: string;
  content?: {
    blocks?: any[];
  };
};

type Props = {
  params: {
    cat_page_slug: string;
  };
  searchParams: {
    page?: string;
  };
};

export const revalidate = 60 * 15;

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const currentListPage = Number(searchParams?.page) || 1;
  const catPageSlug = params.cat_page_slug;

  const catPageData = await itemFinder(catPageSlug, 1, "object");

  let postsData: PostsDataType = {};
  let page: PageDataType = {};

  if (catPageData?.type === "category") {
    postsData = await getAllPost({
      limit: 10,
      category: catPageData?._id,
    });
  } else {
    // const fetchedPageData = await getStaticPages({ slug: catPageData?.slug });
    // page = fetchedPageData?.page || {};
    page = catPageData;
  }

  const pageCount = Number(postsData?.Pagination?.pageCount) || 1;

  return (
    <>
      <BreadcrumbWraper params={params} />
      <div className="mt-3 grid min-h-screen gap-3 lg:grid-cols-3">
        {postsData?.posts && (
          <main className="col-span-3 grid h-fit gap-3 md:grid-cols-2 lg:col-span-2">
            {postsData?.posts?.map((post, index) => (
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

        {/* Page Content */}
        {page?.title && (
          <main className="h-fit gap-3 lg:col-span-2">
            <h1 className="lg:font-4xl text-3xl font-bold leading-relaxed">
              {page.title}
            </h1>
            <Blocks blocks={page.content?.blocks || []} />
          </main>
        )}

        <RHS_wrapper />
      </div>
    </>
  );
};

export default Page;
