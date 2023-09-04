import Image from "next/image";
import Link from "next/link";
import urlFor from "../../sanity/lib/urlFor";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className='flex relative w-full h-72 md:h-96 my-0 md:my-10 mx-auto'>
          <Image
            className='object-contain'
            src={urlFor(value).url()}
            alt='Blog Post Image'
            fill
          />
        </div>
      );
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className='ml-10 py-5 list-disc space-y-5'>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className='ml-lg list-decimal'>{children}</ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className='text-5xl py-10 font-bold'>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='text-4xl py-10 font-bold'>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='text-3xl py-10 font-bold'>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='text-center mx-auto'>{children}</h4>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className='border-l-[#F7AB0A] border-l-4 pl-5 py-5 my-5'>
        {children}
      </blockquote>
    ),
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className='underline decoration-[#F7AB0A] hover:decoration-black'
        >
          {children}
        </Link>
      );
    },
  },
};