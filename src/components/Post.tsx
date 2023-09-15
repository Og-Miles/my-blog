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
  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Header />
      <Banner />
      <main className='container mx-auto prose  dark:prose-invert prose-lg max-w-7xl px-10'>
        {post?.body ? (
          <PortableText value={post?.body} components={RichTextComponents} />
        ) : null}
        <BackToTopButton />
      </main>
    </>
  );
}
