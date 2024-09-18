type Params = {
  slug?: string;
};

export const getStaticPages = async ({ slug }: Params = {}) => {
  let query: string = "";
  if (slug) {
    query = `slug=${slug}`;
  }

  let data = await fetch(process.env.API_BASE_URL + `/staticPages?${query}`, {
    next: { revalidate: 60*15 },
  });
  return await data?.json();
};

export const staticPagesDetails = async (e: any) => {
  const data = await fetch(`${process.env.API_BASE_URL}/staticPages/${e}`, {
    next: { revalidate: 60*15 },
  });
  return data.json();
};
