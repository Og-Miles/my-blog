import { SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";
import urlFor from "../../sanity/lib/urlFor";

const SearchedBlogList = ({ posts }: { posts: SanityDocument[] }) => {
  console.log("posts:", posts);

  return (
    <div className='flex flex-wrap w-full'>
      {posts.map((post: SanityDocument) => (
        <div key={post._id} className='flex justify-between p-4 mb-4'>
          <div className='w-full'>
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className=' object-contain rounded'
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
      ))}
    </div>
  );
};

export default SearchedBlogList;
