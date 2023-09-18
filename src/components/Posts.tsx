import Link from "next/link";
import type { SanityDocument } from "next-sanity";
import Banner from "../components/Banner";
import Header from "../components/Header";
import BlogList from "./BlogList";
import urlFor from "../../sanity/lib/urlFor";
import Image from "next/image";
import ArticleBanner from "./ArticleBanner";
import { Fragment, useEffect, useState } from "react";
import { fetchPaginatedData } from "../../sanity/lib/client";

export default function Posts({ posts = [] }: { posts: SanityDocument[] }) {
  const comp = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image src={urlFor(value).url()} alt={"okay"} fill />
      ),
    },
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const postSize = 6; // Amount of Posts to display per page
  const startIndex = (page - 1) * postSize;
  const endIndex = startIndex + postSize;
  const visiblePosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postSize);

  let pageRange = []; //Page range will be dynamic

  // Stating rules for Page range
  if (totalPages <= 5) {
    pageRange = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (page <= 3) {
      pageRange = [1, 2, 3, "...", totalPages - 1, totalPages];
    } else if (page >= totalPages - 2) {
      pageRange = [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageRange = [1, "...", page - 1, page, page + 1, "...", totalPages];
    }
  }

  useEffect(() => {
    fetchPaginatedData(page, postSize).then((result) => {
      setData(result);
    });
  }, [page]);

  return (
    <>
      <Header />
      <Banner posts={posts} />
      <ArticleBanner />
      <main className='container mx-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl px-10 gap-10 gap-y-16 pb-24'>
        {/* <h1 className='text-2xl p-4 font-bold'>{title}</h1> */}

        {visiblePosts.map((post: any) => {
          return (
            <Fragment key={post._id}>
              <Link href={post.slug.current}>
                <BlogList post={post} />
              </Link>
            </Fragment>
          );
        })}
      </main>
      <div className='flex mb-5 items-center mx-auto justify-center'>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className='border text-black py-2 px-3 rounded mr-2 dark:bg-white'
        >
          Previous
        </button>
        {pageRange.map((pageNumber: any, index) => (
          <Fragment key={index}>
            {pageNumber === "..." ? (
              <span className='px-2'>...</span>
            ) : (
              <button
                onClick={() => setPage(pageNumber)}
                className={`${
                  pageNumber === page
                    ? "bg-black text-white"
                    : "border text-black"
                } py-2 px-3 rounded mr-2`}
              >
                {pageNumber}
              </button>
            )}
          </Fragment>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className='bg-black text-white py-2 px-5 rounded'
        >
          Next
        </button>
      </div>
    </>
  );
}
