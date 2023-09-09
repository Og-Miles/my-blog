import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MoonIcon, PhoneIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className='flex items-center justify-between space-x-2 font-bold px-10 py-5 max-w-7xl mx-auto'>
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          {theme === "dark" ? (
            <Image
              src='https://i.imgur.com/liK7j3u.png'
              width={150}
              height={150}
              alt='logo'
            />
          ) : (
            <Image
              src='https://i.imgur.com/6Wr9X1f.png'
              width={150}
              height={150}
              alt='logo'
            />
          )}

          {/* https://i.imgur.com/EwuLaVC.png */}
        </Link>
      </div>

      <div className='flex'>
        <button
          type='button'
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunIcon className='px-2 border-r-2 mr-3 flex w-[40px] cursor-pointer' />
          ) : (
            <MoonIcon className='px-2 border-r-2 mr-3 flex w-[40px] cursor-pointer' />
          )}
        </button>
        <Link href='https://wa.me/2348137525589'>
          <button className='bg-black dark:bg-white text-white px-10 py-3 rounded-full min-w-fit items-center justify-between hidden md:flex'>
            <PhoneIcon className='flex w-[18px] mr-2 dark:text-black' />
            <span className='hidden md:flex dark:text-black'>Contact Us</span>
          </button>
          <PhoneIcon className='flex w-[18px] mr-2 dark:text-white md:hidden' />
        </Link>
      </div>
    </header>
  );
}

export default Header;
