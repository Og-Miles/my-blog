// ./nextjs-pages/src/components/Post.tsx

import Image from "next/image";
import Head from "next/head";
// import imageUrlBuilder from "@sanity/image-url";
// import { client } from "../../sanity/lib/client";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import Header from "./Header";
import Banner from "./Banner";
import urlFor from "../../sanity/lib/urlFor";
import category from "../../sanity/schemas/category";
import { RichTextComponents } from "./RichTextComponents";

// const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header />
      <Banner />
      <article className='px-10 pb-28 max-w-7xl mx-auto'>
        <section className='space-y-2 border text-white'>
          <div className='relative min-h-56 flex flex-col md:flex-row justify-between'>
            <div className='absolute top-0 w-full h-full opacity-10 p-10 blur-sm'>
              <Image
                className='object-cover object-center mx-auto'
                src={urlFor(post.mainImage).url()}
                alt='{post.author.name}'
                fill
              />
            </div>

            <section className='p-5 bg-[#2b8fa8] w-full'>
              <div className='flex flex-col md:flex-row justify-between gap-y-5'>
                <div>
                  <h1 className='text-4xl font-extrabold'>{post.title}</h1>
                  <p>
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  <Image
                    className='rounded-full'
                    src={urlFor(post.author?.image).url()}
                    alt={post.author?.name}
                    height={40}
                    width={40}
                  />
                  <div className='w-64'>
                    <h3 className='text-lg font-bold'>{post.author.name}</h3>
                    <div>{/* {author BIO} */}</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className='italic pt-10'>{post.description}</h2>
                <div className='flex items-center justify-end space-x-2 '>
                  {post.categories?.map((category: any) => (
                    <p
                      key={category._id}
                      className='bg-white text-black px-3 py-1 rounded-full text-sm font-semibold mt-4'
                    >
                      {category.title}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>

        <PortableText value={post.body} components={RichTextComponents} />
      </article>
    </>
  );
}
