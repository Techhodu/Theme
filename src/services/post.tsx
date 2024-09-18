type params = {
  limit?: number;
  category?: string;
  subCategory?: string;
};
// subCategory
export const getAllPost = async ({ limit, category, subCategory }: params) => {
  let query: string = "";
  if (limit) {
    query += `limit=${limit}`;
  } else {
    query += `limit=${10}`;
  }
  if (category) {
    query += `&category=${category}`;
  }
  if (subCategory) {
    query += `&subCategory=${subCategory}`;
  }
  let data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/posts?${query}`, {
    next: { revalidate: 60*15 },
  });
  return await data.json();
};

export const postDetails = async (e: any) => {
  const dynamicData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${e}`, {
    next: { revalidate: 60*15 },
  });
  return dynamicData.json();
};
