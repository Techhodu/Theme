export const userDetails = async (e: any) => {
    const dynamicData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${e}`, {
      next: { revalidate: 60*15 },
    });
    return dynamicData.json();
  };
  