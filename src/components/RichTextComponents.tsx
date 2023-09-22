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
            priority
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
      <h1 className='text-4xl md:text-5xl py-10 font-bold my-0'>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='text-3xl md:text-4xl py-10 font-bold my-0'>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='text-2xl md:text-3xl xl py-10 font-bold my-0'>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='text-center mx-auto my-0'>{children}</h4>
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
