import { SanityDocument, groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import urlFor from "../../sanity/lib/urlFor";
import { SanityClient } from "sanity";
import { PortableText } from "@portabletext/react";

function BlogList({ post }: { post: SanityDocument }) {
  const comp = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt={"okay"}
          className='object-cover object-left lg:object-center'
          fill
        />
      ),
    },
  };

  return (
    <div>
      {/* Posts Display*/}
      <div className='group cursor-pointer'>
        <div className='relative drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out w-full h-80'>
          {post.mainImage ? (
            <PortableText value={post.mainImage} components={comp} />
          ) : (
            <p>No main image available</p>
          )}
          <div className='absolute bg-white w-fit h-fit rounded-3xl bottom-5 left-[200px] items-center py-2 px-3'>
            <div className='flex justify-evenly '>
              <Image
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                width={25}
                height={25}
                className='rounded-full mr-2'
              />
              <p className='font-semibold'>{post?.author?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className='font-bold text-lg mt-3 mb-3'>{post.title}</h2>
      <p>{post.description}</p>
      <button className='bg-black rounded text-white py-3 px-5 mt-3'>
        Read More
      </button>
    </div>
  );
}

export default BlogList;