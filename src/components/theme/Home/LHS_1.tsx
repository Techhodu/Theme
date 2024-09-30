import Image from "next/image";
import Link from "next/link";
import cover from "../../../assets/images/cover.png";
import { getAllPost } from "@/services";
import { formatDateTime } from "@/lib/formate";
import { buildUrl } from "@/lib/builder";

type Props = {
  limit?: number;
  category?: string;
  slug: string;
  category_title: string;
};

export default async function LHS_1(Props: Props) {
  const postData = await getAllPost(Props);
  const posts: [any] = postData.posts || [];

  const postsWithUrls = await Promise.all(
    posts?.map(async (post: any) => {
      const url = await buildUrl(post?._id);
      return { ...post, url };
    })
  );
  return (
    <div className="grid gap-3 bg-muted/85 p-3 shadow-lg sm:grid-cols-4">
      <Link className="col-span-4" href={`/${Props?.slug}`}>
        <div className="flex w-full items-center justify-between">
          <h3 className="text-2xl font-semibold">{Props?.category_title}</h3>
          {/* <div className="text-primary">View More</div> */}
          <div className="min-w-fit rounded-full border px-2 bg-primary/80">
            View More
          </div>
        </div>
      </Link>
      {postsWithUrls &&
        postsWithUrls.map((post: any, index: number) =>
          index === 0 ? (
            <Link
              className="col-span-4"
              href={post?.url || "URL creation failed"}
              key={index}
            >
              <div className="relative w-full">
                <Image
                  priority={true}
                  className="max-h-52 w-full rounded object-cover md:max-h-[400px]"
                  src={post?.image?.url || cover}
                  alt={post?.image?.title || "alt"}
                  width={400}
                  height={250}
                />
                <h3 className="dark:bg-slate-200/30shadow-black absolute bottom-0 line-clamp-2 w-full bg-slate-600/30 px-6 text-base font-bold tracking-tight text-secondary drop-shadow-2xl dark:shadow-white lg:text-2xl">
                  {post?.title}
                </h3>
              </div>
            </Link>
          ) : (
            <Link
              href={post?.url || "URL creation failed"}
              key={index}
              className="relative col-span-4 border sm:col-span-2 lg:col-span-1"
            >
              <div className="col-span-1 max-h-40 w-full overflow-hidden rounded lg:max-h-24">
                <Image
                  className="h-full w-full object-cover"
                  src={post?.image?.url || cover}
                  alt={post?.image?.title || "alt"}
                  width={100}
                  height={80}
                />
              </div>
              <div className="p-3">
                <h3 className="line-clamp-2 text-lg font-medium tracking-tight lg:text-base">
                  {post?.title}
                </h3>
                <h6 className="text-xs tracking-tight text-gray-600">
                  {formatDateTime(post?.publicAt)}
                </h6>
              </div>
            </Link>
          )
        )}
    </div>
  );
}
