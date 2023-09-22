import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SocialIcon } from "react-social-icons";
import Search from "./Search";
import { SanityDocument } from "next-sanity";

function Banner(posts: any) {
  return (
    <div className='flex flex-col lg:flex-row justify-between px-10 py-5 space-x-2 max-w-7xl mx-auto'>
      <div>
        <h1 className='text-7xl font-bold'>Mile's Weekly Blog</h1>
        <p className='mt-5 md:mt-2 text-gray-400 max-w-sm'>
          Latest technologies | Weekly Debugging | New Features, projects talks
          & More!
        </p>
      </div>

      <div className='mt-5 lg:mt-0'>
        <SocialIcon
          url='https://linkedin.com/in/ogbuji-emmanuel'
          className='mr-3 dark:bg-white rounded-full'
        />
        <SocialIcon
          url='https://twitter.com/BujiMiles'
          className='dark:bg-white rounded-full'
        />
      </div>
    </div>
  );
}

export default Banner;
