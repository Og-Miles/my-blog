// ./nextjs-pages/src/pages/index.tsx

import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import Posts from "@/components/Posts";
import { getClient } from "../../sanity/lib/getClient";
import dynamic from "next/dynamic";
import PreviewPosts from "@/components/PreviewPosts";
import { GetStaticProps } from "next";
import Link from "next/link";

const PreviewProvider = dynamic(() => import("@/components/PreviewProvider"));

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)`;

export const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.previewData || false;
  const previewToken = preview ? process.env.SANITY_READ_TOKEN : ``;
  if (preview && !previewToken) {
    throw new Error(
      `Preview mode is active, but SANITY_READ_TOKEN is not set in environment variables`
    );
  }
  const client = getClient(previewToken);

  const data = await client.fetch(postsQuery);

  return { props: { data, preview, previewToken } };
};

export default function Home({
  data,
  preview,
  previewToken,
}: {
  data: SanityDocument[];
  preview: boolean;
  previewToken?: string;
}) {
  if (preview && previewToken) {
    return (
      <PreviewProvider previewToken={previewToken}>
        <PreviewPosts posts={data} />
        <div className='prose prose-blue p-8'>
          <Link href='/api/exit-preview'>
            <p>Exit preview</p>
          </Link>
        </div>
      </PreviewProvider>
    );
  }

  return <Posts posts={data} />;
}
