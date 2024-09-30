import Image from "next/image";
import Link from "next/link";
import cover from "../../../assets/images/cover.png";
import { getAllPost } from "@/services";
import { formatDateTime } from "@/lib/formate";
import { buildUrl } from "@/lib/builder";

type Props = {
  limit?: number;
  category?: string;
  slug?: string;
  category_title: string;
};

export default async function LHS_3(Props: Props) {
  const postData = await getAllPost(Props);
  const posts: [any] = postData.posts || [];

  const postsWithUrls = await Promise.all(
    posts?.map(async (post: any) => {
      const url = await buildUrl(post?._id);
      return { ...post, url };
    })
  );
  return (
    <div className="bg-muted/85 p-3 shadow-lg">
      <Link className="col-span-2" href={`/${Props?.slug}`}>
        <div className="flex w-full items-center justify-between">
          <h3 className="text-2xl font-semibold">{Props?.category_title}</h3>
          <div className="min-w-fit rounded-full border px-2 bg-primary">
            View More
          </div>
        </div>
      </Link>
      <div className="grid gap-3 p-3 sm:grid-cols-2">
        {postsWithUrls &&
          postsWithUrls.map(
            (post: any, index: number) =>
              index === 0 && (
                <Link
                  href={post?.url || "URL creation failed"}
                  key={index}
                  className="relative border sm:col-span-1"
                >
                  <Image
                    className="w-full rounded object-cover sm:max-h-[400px]"
                    src={post?.image?.url || cover}
                    alt={post?.image?.title}
                    width={100}
                    height={80}
                  />
                  <div className="p-3">
                    <h3 className="my-2 line-clamp-2 text-xl font-semibold leading-loose tracking-tight lg:text-xl">
                      {post?.title}
                    </h3>
                    <h6 className="text-xs tracking-tight text-gray-600">
                      {formatDateTime(post?.publicAt)}
                    </h6>
                  </div>
                </Link>
              )
          )}
        <div className="col-span-1 grid gap-3">
          {postsWithUrls &&
            postsWithUrls.map(
              (post: any, index: number) =>
                index !== 0 && (
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
                          {post.title}
                        </h3>
                        <h6 className="text-xs tracking-tight text-gray-600">
                          {formatDateTime("2024-07-30T14:18:01.447Z")}
                        </h6>
                      </div>
                    </div>
                  </Link>
                )
            )}
        </div>
      </div>
    </div>
  );
}
