import Image from "next/image";
import React from "react";
import post from "../../sanity/schemas/post";
import { SanityDocument, groq } from "next-sanity";
import urlFor from "../../sanity/lib/urlFor";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
    _id, title, slug, author, mainImage
  }`;

function ArticleBanner({ post }: { post: SanityDocument }) {
  console.log(post);
  return (
    <div className='mb-5 flex-flex-col'>
      <div className='flex items-center gap-0 mb-5'>
        <hr className='w-full border-gray-400' />
        <p className='text-center font-bold text-2xl w-[281px]'>Articles</p>
        <hr className='w-full border-gray-400' />
      </div>
      <div className='w-full h-80 relative'>
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className='rounded-lg'
          />
        ) : (
          "No image found"
        )}
      </div>
    </div>
  );
}

export default ArticleBanner;
