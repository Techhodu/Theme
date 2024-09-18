// search Code
// search = 1 find in category, page.
// search = 2 find in subCategory,  and posts.
// search = 3 find in  posts.

import {
  getCategories,
  getStaticPages,
  getSubCategories,
  postDetails,
} from "@/services";

async function findBySlug(
  returnValueKey: "title" | "object",
  slug: string,
  searchInCategory: boolean,
  searchInSubCategory: boolean,
  searchInPage: boolean,
  fetchPost: boolean,
) {
  if (searchInCategory) {
    const categoryData = await getCategories({ slug });
    if (categoryData?.category) {
      return returnValueKey === "title"
        ? categoryData.category.title
        : { ...categoryData.category, type: "category" };
    }
  }

  if (searchInSubCategory) {
    const subCategoriesData = await getSubCategories({ slug });
    if (subCategoriesData?.subCategory) {
      return returnValueKey === "title"
        ? subCategoriesData.subCategory.title
        : { ...subCategoriesData.subCategory, type: "subCategory" };
    }
  }

  if (searchInPage) {
    const pagesData = await getStaticPages({ slug });
    if (pagesData?.page) {
      return returnValueKey === "title"
        ? pagesData.page.title
        : { ...pagesData.page, type: "page" };
    }
  }

  if (fetchPost) {
    const id = slug?.split("-")?.pop();
    if (id) {
      const postData = await postDetails(id);
      if (postData?.post) {
        return returnValueKey === "title"
          ? postData.post.title
          : { ...postData?.post, type: "post" };
      }
    }
  }

  return null;
}

export async function itemFinder(
  slug: string,
  search?: number,
  returnValue?: "title" | "object",
) {
  const searchKey = search || 1;
  const returnValueKey = returnValue || "object";

  //returnValueKey slug, Category, subCategory, Page, post

  switch (searchKey) {
    case 1:
      return await findBySlug(returnValueKey, slug, true, false, true, false);
    case 2:
      return await findBySlug(returnValueKey, slug, false, true, false, true);
    case 3:
      return await findBySlug(returnValueKey, slug, false, false, false, true);
    default:
      return null; // Default case if searchKey doesn't match any expected values
  }
}
