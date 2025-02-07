import { buildUrl } from "@/lib/builder";
import { getAllPost } from "@/services";
import type { MetadataRoute } from "next";

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: 'daily' | 'always' | 'hourly' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const postData = await getAllPost({ limit: 2000 });
    const posts: any[] = postData?.posts || [];

    const postsWithUrls = await Promise.all(
      posts.map(async (post: any) => {
        try {
          const url = await buildUrl(post?._id);
          if (!url) {
            console.error(`Failed to build URL for post ID: ${post?._id}`);
            return null;
          }

          const entry: SitemapEntry = {
            url: `${process.env.NEXT_PUBLIC_URL}${url}`,
            lastModified: post?.updatedAt || post?.createdAt || new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.7
          };

          return entry;
        } catch (error) {
          console.error(`Error processing post ID ${post?._id}:`, error);
          return null;
        }
      })
    );

    // Filter out any null entries
    const validUrls = postsWithUrls.filter((item): item is SitemapEntry => 
      item !== null
    );

    // Add homepage
    const staticRoutes: SitemapEntry[] = [
      {
        url: process.env.NEXT_PUBLIC_URL || 'https://khabartaazgi.com',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0
      }
    ];

    return [...staticRoutes, ...validUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return minimal valid sitemap in case of error
    return [
      {
        url: process.env.NEXT_PUBLIC_URL || 'https://khabartaazgi.com',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0
      }
    ];
  }
}