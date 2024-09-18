import {
  categoryDetails,
  postDetails,
  subCategoryDetails,
} from "@/services";
import type { UrlObject } from "url";
export async function buildUrl(
  id: string,
  search?: number,
): Promise<string | UrlObject> {
  const searchKey = search || 1;
  let category: any = "";
  let subCategory: any = "";
  let url: string = "";

  const postData = await postDetails(id);
  const post = postData?.post;
  const primaryCategory = post?.primaryCategory;

  if (primaryCategory) {
    const categoriesData = await categoryDetails(primaryCategory);
    category = categoriesData?.category;

    if (!category) {
      const subCategoriesData = await subCategoryDetails(primaryCategory);
      subCategory = subCategoriesData?.subCategory;
    } else {
      url = `/${category.slug}/${post?.slug}-${post?._id}`;
    }

    if (subCategory) {
      const categoriesData = await categoryDetails(subCategory?.category);
      category = categoriesData?.category;
      if (category) {
        url = `/${category.slug}/${subCategory?.slug}/${post?.slug}-${post?._id}`;
      }
    }
  }

  return url;
}
