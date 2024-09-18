type Params = {
  slug?: string;
};

export const getSubCategories = async ({ slug }: Params = {}) => {
  let query: string = "";
  if (slug) {
    query = `slug=${slug}`;
  }
  let data = await fetch(process.env.NEXT_PUBLIC_API_URL + `/subCategories?${query}`, {
    next: { revalidate: 60*15 },
  });
  return await data.json();
};

export const subCategoryDetails = async (e: any) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subCategories/${e}`, {
    next: { revalidate: 60*15 },
  });
  return data.json();
};
