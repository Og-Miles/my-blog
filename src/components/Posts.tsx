// ./nextjs-pages/src/components/Posts.tsx
"use client";
import Link from "next/link";
import type { SanityDocument } from "next-sanity";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import BlogList from "./BlogList";
import urlFor from "../../sanity/lib/urlFor";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

export default function Posts({ posts }: { posts: SanityDocument }) {
  // const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;
  const comp = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt={"okay"}
          width={300}
          height={300}
        />
      ),
    },
  };
  return (
    <>
      <Head>{/* <title>{title}</title> */}</Head>
      <Header />
      <Banner />
      <main className='container mx-auto grid grid-cols-1 divide-y divide-blue-100 max-w-7xl px-10'>
        {/* <h1 className='text-2xl p-4 font-bold'>{title}</h1> */}
        {posts.map((post: any) => {
          console.log(post.title);
          return (
            <Link
              key={post._id}
              href={post.slug.current}
              className='p-4 hover:bg-blue-50'
            >
              <BlogList post={post} />
            </Link>
          );
        })}
      </main>
    </>
  );
}
