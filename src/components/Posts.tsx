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
import { useEffect, useState } from "react";
import { fetchPaginatedData } from "../../sanity/lib/client";

export default function Posts({ posts }: { posts: SanityDocument }) {
  // const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;
  const comp = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image src={urlFor(value).url()} alt={"okay"} fill />
      ),
    },
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 1; // Set your desired page size here
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visiblePosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / pageSize);

  useEffect(() => {
    fetchPaginatedData(page, pageSize).then((result) => {
      setData(result);
    });
  }, [page]);

  return (
    <>
      <Head>{/* <title>{title}</title> */}</Head>
      <Header />
      <Banner />
      <ArticleBanner />
      <main className='container mx-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl px-10 gap-10 gap-y-16 pb-24'>
        {/* <h1 className='text-2xl p-4 font-bold'>{title}</h1> */}

        {visiblePosts.map((post: any) => {
          return (
            <>
              <Link key={post._id} href={post.slug.current}>
                <BlogList post={post} />
              </Link>
            </>
          );
        })}
      </main>
      <div className='flex justify-around mb-5'>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className='border text-black py-2 px-3 rounded'
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className='bg-black text-white py-2 px-5 rounded'
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
