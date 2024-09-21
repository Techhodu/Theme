import { buildUrl } from "@/lib/builder";
import { getAllPost } from "@/services";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postData = await getAllPost({ limit: 2000 });
  const posts: any[] = postData?.posts || [];

  // Build URLs for each post
  const postsWithUrls = await Promise.all(
    posts.map(async (post: any) => {
      const url = await buildUrl(post?._id);
      return {
        url: `${process.env.NEXT_PUBLIC_URL}${url}`, // Append the URL
        lastModified:
          post?.updatedAt || post?.createdAt || new Date().toISOString(), // Default to createdAt or updatedAt
      };
    }),
  );

  return [...postsWithUrls];
}
