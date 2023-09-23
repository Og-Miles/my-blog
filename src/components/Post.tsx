import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../sanity/lib/client";
import Banner from "./Banner";
import Header from "./Header";
import { RichTextComponents } from "./RichTextComponents";
import BackToTopButton from "./BackToTopButton";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  console.log(post._createdAt);
  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Header />
      <Banner />
      <main className='container mx-auto prose  dark:prose-invert prose-lg max-w-7xl px-10'>
        {/* <div className='shadow-md rounded-full w-fit'>
          <p className='py-1 px-2'>
            {new Date(post._createdAt).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div> */}
        {post?.body ? (
          <PortableText value={post?.body} components={RichTextComponents} />
        ) : null}
        <BackToTopButton />
      </main>
    </>
  );
}
