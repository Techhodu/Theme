import Link from "next/link";
import React from "react";
import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_1 from "@/components/theme/RHS_1";
import List from "@/components/theme/List";
import { itemFinder } from "@/lib/finder";
import { getAllPost, getStaticPages } from "@/services";
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
import type { Metadata, ResolvingMetadata } from "next";
import logo from "@/assets/images/logo.png";

type PostsDataType = {
  posts?: any[];
  Pagination?: {
    pageCount?: number;
    count?: number;
  };
};

type Props = {
  params: {
    createdBy: string;
  };
  searchParams: {
    page?: string;
  };
};

export const revalidate = 60 * 15;

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const currentListPage = Number(searchParams?.page) || 1;

  let postsData: PostsDataType = {};
  let catPageSlug= "PostsDataType" ;

  const createdBy = params.createdBy;
  postsData = await getAllPost({
    limit: 10,
    createdBy: createdBy,
  });

  const pageCount = Number(postsData?.Pagination?.pageCount) || 1;

  return (
    <>
      <BreadcrumbWraper params={params} />
      <div className="mt-3 grid min-h-screen gap-2 lg:grid-cols-3">
        <main className="col-span-3 grid h-fit flex-row gap-3 md:grid-cols-2 lg:col-span-2">
          {postsData.posts?.map((post, index) => (
            <List key={index} post={post} cat_subCat_slug={catPageSlug} />
          ))}

          {pageCount > 1 && (
            <Pagination className="md:col-span-2">
              <PaginationContent>
                {currentListPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/${catPageSlug}?page=${currentListPage - 1}`}
                    />
                  </PaginationItem>
                )}

                {currentListPage !== 1 && (
                  <PaginationItem>
                    <PaginationLink href={`/${catPageSlug}`}>1</PaginationLink>
                  </PaginationItem>
                )}

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

                <PaginationItem>
                  <PaginationLink
                    href={`/${catPageSlug}?page=${currentListPage}`}
                    isActive
                  >
                    {currentListPage}
                  </PaginationLink>
                </PaginationItem>

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

                {currentListPage < pageCount && (
                  <PaginationItem>
                    <PaginationLink href={`/${catPageSlug}?page=${pageCount}`}>
                      {pageCount}
                    </PaginationLink>
                  </PaginationItem>
                )}

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
        <RHS_wrapper />
      </div>
    </>
  );
};

export default Page;
