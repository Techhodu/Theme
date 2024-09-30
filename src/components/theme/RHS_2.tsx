import Image from "next/image";
import Link from "next/link";
import cover from "../../assets/images/cover.png";
import { getAllPost } from "@/services";
import { formatDateTime } from "@/lib/formate";
import { buildUrl } from "@/lib/builder";

type Props = {
  limit?: number;
  category?: string;
};

export default async function RHS_1(Props: Props) {
  console.log(Props)
  const postData = await getAllPost(Props);
  const posts: [any] = postData?.posts || [];

  const postsWithUrls = await Promise.all(
    posts?.map(async (post: any) => {
      const url = await buildUrl(post?._id);
      return { ...post, url };
    }),
  );
  return (
    <div className="flex flex-col gap-3 bg-muted/85 p-3 shadow-lg">
      <div className="flex">
        <h3 className="mr-2 min-w-fit">Trending News</h3>
        <hr className="my-auto w-full" />
        <Link
          className="min-w-fit rounded-full border px-2 bg-primary"
          href={"#"}
        >
          View More
        </Link>
      </div>
      {postsWithUrls &&
        postsWithUrls?.map((post: any, index: number) => (
          <Link href={post?.url || "URL creation failed"} key={index}>
            <div className="col-span-2 grid h-20 grid-cols-3 gap-3 overflow-hidden rounded sm:col-span-1">
              <div className="col-span-1 h-full w-full overflow-hidden rounded">
                <Image
                  className="h-full w-full object-cover"
                  src={post?.image?.url || cover}
                  alt={post?.image?.title}
                  width={100}
                  height={80}
                />
              </div>
              <div className="col-span-2">
                <h3 className="mb-2 line-clamp-2 text-base font-medium tracking-tight lg:text-base">
                  {post?.title}
                </h3>
                <h6 className="text-xs tracking-tight text-gray-600">
                  {formatDateTime(post?.publicAt)}
                </h6>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
