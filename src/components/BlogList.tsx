import { SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";
import urlFor from "../../sanity/lib/urlFor";
import { SanityClient } from "sanity";
import { PortableText } from "@portabletext/react";

function BlogList({ post }: { post: SanityDocument }) {
  const comp = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image src={urlFor(value).url()} alt={"okay"} fill />
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
        </div>
      </div>
      <h2>{post.title}</h2>
    </div>
  );
}

export default BlogList;
