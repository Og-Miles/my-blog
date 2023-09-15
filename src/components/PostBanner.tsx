import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../sanity/lib/client";
import { SanityDocument } from "@sanity/client";

export default function PostBanner({ post }: { post: SanityDocument }) {
  const builder = imageUrlBuilder(client);
  return (
    <>
      <article>
        <section className='space-y-2 border text-white'>
          <div className='relative min-h-56 flex flex-col md:flex-row justify-between rounded'>
            <div className='absolute top-0 w-full h-full opacity-10 p-10 blur-sm'>
              {post?.mainImage ? (
                <Image
                  src={builder.image(post?.mainImage).url()}
                  fill
                  alt={post?.mainImage?.alt}
                />
              ) : null}
            </div>

            <section className='p-5 bg-[#2b8fa8] w-full'>
              <div className='flex flex-col md:flex-row justify-between gap-y-5'>
                <div>
                  <h1 className='text-4xl font-extrabold'>{post?.title}</h1>
                  <p>
                    {new Date(post?._createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  <Image
                    className='rounded-full'
                    src={builder.image(post?.author?.image).url()}
                    alt={post?.author?.name}
                    height={40}
                    width={40}
                  />
                  <div className='w-64'>
                    <h3 className='text-lg font-bold'>{post?.author.name}</h3>
                    <div>{/* {author BIO} */}</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className='italic pt-10'>{post?.description}</h2>
                <div className='flex items-center justify-end space-x-2 '>
                  {post?.categories?.map((category: any) => (
                    <p
                      key={category?._id}
                      className='bg-white text-black px-3 py-1 rounded-full text-sm font-semibold mt-4'
                    >
                      {category?.title}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      </article>
    </>
  );
}
