import { SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";
import urlFor from "../../sanity/lib/urlFor";

const SearchedBlogList = ({ posts }: { posts: SanityDocument[] }) => {
  console.log("posts:", posts); // Updated prop name

  return (
    <div className='flex flex-wrap w-full h-full'>
      {posts.map((post: SanityDocument) => (
        <div
          key={post._id}
          className='flex flex-col p-4 border border-gray-300 mb-4'
        >
          <div className='w-32 h-32 relative'>
            <Image
              src={urlFor(post.mainImage).url()} // Assuming `mainImage` is a valid URL
              alt={post.title}
              className='w-full h-full object-cover rounded'
              width={32}
              height={32}
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
      ))}
    </div>
  );
};

export default SearchedBlogList;
