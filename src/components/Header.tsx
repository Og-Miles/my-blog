import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className='flex items-center justify-between space-x-2 font-bold px-10 py-5 max-w-7xl mx-auto'>
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          <Image
            src='https://i.imgur.com/6Wr9X1f.png'
            width={150}
            height={150}
            alt='logo'
          />
        </Link>
      </div>

      <div className='flex'>
        <MoonIcon className='px-2 border-r-2 mr-3 flex w-[40px]' />
        <button className='bg-black text-white px-10 py-3 rounded-full min-w-fit'>
          Contact Us
        </button>
      </div>
    </header>
  );
}

export default Header;
