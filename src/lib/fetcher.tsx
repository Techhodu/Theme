import { getAllPost } from "@/services";

export async function itemDataFinder(search?: number, id?: string) {
  const searchKey = search || 1;

  if (searchKey === 1) {
    return getAllPost({ limit: 10, category: id });
  }
}
