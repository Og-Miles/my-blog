import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@chakra-ui/react-use-outside-click";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { groq } from "next-sanity";
import { SanityDocument } from "sanity";
import SearchedBlogList from "./SearchedBlogList";
import { client } from "../../sanity/lib/client";

const Search = (post: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [postsData, setPostsData] = useState<SanityDocument[]>([]);
  const ref = useRef<any>();

  const closeAndClearPosts = () => {
    setModalOpen(false);
    setPostsData([]);
  };

  useOutsideClick({
    ref,
    handler: () => {
      closeAndClearPosts();
    },
  });

  const postsQuery = groq`*[_type == "post" && (title match $searchText || categories match $searchText)]{
    ...,
    title,
    description,
    "id": _id,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "author": author->{name},
    "categories": categories[]->{id}
  } | order(_createdAt desc)`;

  const fetchPosts = async () => {
    try {
      const fetchedPosts: SanityDocument[] = await client.fetch(postsQuery, {
        searchText: `${searchText}`,
      });
      setPostsData(fetchedPosts);
      console.log(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    let searchTimeout: NodeJS.Timeout | null = null;

    searchTimeout = setTimeout(() => {
      if (searchText.trim().length >= 3) {
        fetchPosts();
      }
    }, 1000);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchText]);

  return (
    <div className=' flex flex-col justify-between max-w-7xl px-10' ref={ref}>
      <div className='flex place-items-center px-5 mt-5 max-w-xs box-border border border-gray-900 rounded-full dark:border-gray-100'>
        <MagnifyingGlassIcon className='w-[24px] h-[24px] items-center dark:text-white' />
        <input
          type='text'
          placeholder='Search'
          className='border-none outline-none placeholder-black dark:placeholder-white px-5 py-2 items-center bg-transparent'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={() => setModalOpen(true)}
        />
      </div>
      {/* Open Box */}
      {modalOpen && (
        <div>
          {postsData.length === 0 ? (
            <div className='box-border border border-gray-900 dark:border-white justify-between rounded-full max-w-fit px-5 py-2 mt-2 items-center'>
              <>No Blog Post Found</>
            </div>
          ) : (
            <div className='max-w-fit px-5 py-2 mt-2 items-center box-border border border-gray-900 dark:border-white drop-shadow-sm justify-between'>
              <SearchedBlogList posts={postsData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
