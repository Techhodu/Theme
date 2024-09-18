type Params = {
  slug?: string;
};

export const getCategories = async ({ slug }: Params = {}) => {
  let query: string = "";
  if (slug) {
    query = `slug=${slug}`;
  }
  let data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/categories?${query}`, {
    next: { revalidate: 60*15 },
  });
  return await data.json();
};

export const categoryDetails = async (e: any) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${e}`, {
    next: { revalidate: 60*15 },
  });
  return data.json();
};
