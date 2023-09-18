import { SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";
import urlFor from "../../sanity/lib/urlFor";
import Link from "next/link";

const SearchedBlogList = ({ posts }: { posts: SanityDocument[] }) => {
  return (
    <div className='flex flex-wrap w-full'>
      {posts.map((post: SanityDocument) => (
        <Link key={post._id} href={`/${post?.slug?.current || ""}`}>
          <div className='flex justify-between p-4 mb-4 mx-7'>
            <div className='w-full mr-3'>
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className='object-contain rounded'
                width={220}
                height={140}
                priority
              />
            </div>
            <div className='mt-2'>
              <h2 className='text-lg font-semibold'>{post.title}</h2>
              <p className='text-gray-600'>{post.categories?.title}</p>{" "}
              {/* Assuming a post has only one category */}
              <p className='mt-2'>{post.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchedBlogList;
