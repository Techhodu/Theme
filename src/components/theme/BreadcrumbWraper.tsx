import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { itemFinder } from "@/lib/finder";

type Props = any;

export default function BreadcrumbWraper({ params }: Props) {
  const cat_page_slug = params?.cat_page_slug;
  const subCat_post_slug = params?.subCat_post_slug;
  const post_slug = params?.post_slug;

  return (
    <Breadcrumb className="bg mt-3 w-full">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {cat_page_slug && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {subCat_post_slug ? (
                <BreadcrumbLink href={`/${cat_page_slug}`}>
                  {itemFinder(cat_page_slug, 1, "title")}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {itemFinder(cat_page_slug, 1, "title")}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
        {subCat_post_slug && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {post_slug ? (
                <BreadcrumbLink href={`/${cat_page_slug}/${subCat_post_slug}`}>
                  {itemFinder(subCat_post_slug, 2, "title")}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {itemFinder(subCat_post_slug, 2, "title")}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}
        {post_slug && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {itemFinder(post_slug, 3, "title")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
