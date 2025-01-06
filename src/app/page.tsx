import LHS_1 from "@/components/theme/Home/LHS_1";
import LHS_2 from "@/components/theme/Home/LHS_2";
import LHS_3 from "@/components/theme/Home/LHS_3";
import RHS_1 from "@/components/theme/RHS_1";
import Ticker from "@/components/theme/Ticker";

import Image from "next/image";
import { getCategories, getAllPost } from "@/services";

import BreadcrumbWraper from "@/components/theme/BreadcrumbWraper";
import RHS_wrapper from "@/components/theme/wrappers/RHS_wrapper";

export const revalidate = 60 * 15;

export default async function Home() {
  const categoriesData = await getCategories();
  const categories: any[] = categoriesData?.categories || [];

  const filteredCategories: any[] = categories.filter(
    (category) =>
      category.visibility === "both" || category.visibility === "mainMenu",
  );

  // Sort the filtered categories by homeHierarchy in increasing order
  const sortedCategories: any[] = filteredCategories.sort(
    (a, b) => a.homeHierarchy - b.homeHierarchy,
  );

  return (
    <>
      <BreadcrumbWraper />
      <div className="mt-3 grid gap-2 lg:grid-cols-3">
        <div className="col-span-3 flex flex-col gap-3 lg:col-span-2">
          {sortedCategories.map((category, index) => {
            switch (index) {
              case 0:
                return (
                  <LHS_1
                    key={index}
                    limit={5}
                    // category={category?._id}
                    // slug={category?.slug}
                    category_title={"ब्रेकिंग न्यूज़"}
                  />
                );
              case 1:
                return (
                  <LHS_2
                    key={index}
                    limit={4}
                    category={category._id}
                    slug={category.slug}
                    category_title={category?.title}
                  />
                );
              case 2:
                return (
                  <LHS_3
                    key={index}
                    limit={5}
                    category={category._id}
                    slug={category.slug}
                    category_title={category?.title}
                  />
                );
              case 3:
                return (
                  <LHS_3
                    key={index}
                    limit={5}
                    category={category._id}
                    slug={category.slug}
                    category_title={category?.title}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
        <RHS_wrapper />
      </div>
    </>
  );
}
