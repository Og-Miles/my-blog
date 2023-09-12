import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SocialIcon } from "react-social-icons";
import algoliasearch from "algoliasearch/lite";

function Banner() {
  // Initialize state within the component function
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchClient = algoliasearch(
    "QAJQY1OUMM",
    "81cc5249d31ecd1cd4b23a13e1f4698d"
  );
  const searchIndex = searchClient.initIndex("Post");

  const searchBlog = async (query) => {
    try {
      const { hits } = await searchIndex.search(query, {
        attributesToHighlight: ["post.title"], // Highlight matching terms in titles
      });
      return hits;
    } catch (error) {
      console.error("Error searching:", error);
      return [];
    }
  };

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = await searchBlog(query);
    setSearchResults(results);
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between px-10 py-5 space-x-2 max-w-7xl mx-auto'>
      <div>
        <h1 className='text-7xl font-bold'>Mile's Weekly Blog</h1>
        <p className='mt-5 md:mt-2 text-gray-400 max-w-sm'>
          Latest technologies | Weekly Debugging | New Features, projects talks
          & More!
        </p>

        <div className='flex place-items-center bg-gray-200 rounded-full px-5 mt-5 max-w-xs'>
          <MagnifyingGlassIcon className='w-[24px] h-[24px] items-center' />
          <input
            type='text'
            placeholder='Search'
            className='border-none outline-none placeholder-black px-5 py-2 items-center bg-transparent'
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        {/* Display search results */}
        <div>
          {searchResults.map((result) => (
            <div key={result.objectID}>
              <h2>{result.title}</h2>
              <p>{result.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-5 lg:mt-0'>
        <SocialIcon
          url='https://linkedin.com/in/ogbuji-emmanuel'
          className='mr-3'
        />
        <SocialIcon url='https://twitter.com/BujiMiles' />
      </div>
    </div>
  );
}

export default Banner;
