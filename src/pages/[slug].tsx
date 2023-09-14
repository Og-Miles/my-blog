import { SanityDocument } from "@sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import Post from "@/components/Post";
import dynamic from "next/dynamic";
import PreviewPost from "@/components/PreviewPost";
import { getClient } from "../../sanity/lib/getClient";
import Link from "next/link";

const PreviewProvider = dynamic(() => import("@/components/PreviewProvider"));

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage {
      _type,
      alt,
      asset {
        _ref,
        _type
      }
    },
    body,
    author->,
    description,
    categories[]->,
    _createdAt
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.previewData || false;
  const previewToken = preview ? process.env.SANITY_READ_TOKEN : "";
  const sanityClient = getClient(previewToken);

  const data = await sanityClient.fetch(postQuery, context.params);

  return { props: { data, preview, previewToken } };
};

export default function Page({
  data,
  preview,
  previewToken,
}: {
  data: any;
  preview: boolean;
  previewToken?: string;
}) {
  if (preview && previewToken) {
    return (
      <PreviewProvider previewToken={previewToken}>
        <PreviewPost post={data} />
        <div className='prose prose-lg px-4 prose-blue clear-both py-16 mx-auto'>
          <Link href='/api/exit-preview'>
            <p>Exit preview</p>
          </Link>
        </div>
      </PreviewProvider>
    );
  }

  return <Post post={data} />;
}
