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
import ArticleBanner from "./ArticleBanner";

export default function Posts({ posts }: { posts: SanityDocument }) {
  // const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;
  const comp = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image src={urlFor(value).url()} alt={"okay"} fill />
      ),
    },
  };
  return (
    <>
      <Head>{/* <title>{title}</title> */}</Head>
      <Header />
      <Banner />
      <ArticleBanner />
      <main className='container mx-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl px-10 gap-10 gap-y-16 pb-24'>
        {/* <h1 className='text-2xl p-4 font-bold'>{title}</h1> */}

        {posts.map((post: any) => {
          return (
            <>
              <Link key={post._id} href={post.slug.current}>
                <BlogList post={post} />
              </Link>
            </>
          );
        })}
      </main>
    </>
  );
}