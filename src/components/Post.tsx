// ./nextjs-pages/src/components/Post.tsx

import Image from "next/image";
import Head from "next/head";
// import imageUrlBuilder from "@sanity/image-url";
// import { client } from "../../sanity/lib/client";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import Header from "./Header";
import Banner from "./Banner";
import urlFor from "../../sanity/lib/urlFor";

// const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
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
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header />
      <Banner />
      <main className='container min-w-lg prose prose-lg p-5 px-10 py-5 space-x-2 max-w-7xl mx-auto'>
        <h1>{post.title}</h1>
        {post?.mainImage ? (
          <Image
            className='float-left m-0 w-1/3 mr-4 rounded-lg'
            src={urlFor(post.mainImage).width(300).height(300).url()}
            width={300}
            height={300}
            alt={post?.mainImage?.alt}
          />
        ) : null}
        {post?.body ? (
          <PortableText value={post.body} components={comp} />
        ) : null}
      </main>
    </>
  );
}
