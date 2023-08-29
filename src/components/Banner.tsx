import React from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { SocialIcon } from 'react-social-icons';


function Banner() {
  return (
    <div className='flex flex-col lg:flex-row justify-between px-10 py-5 space-x-2 max-w-7xl mx-auto'>
        <div>
        <h1 className='text-7xl font-bold'>Mile's Weekly Blog</h1>
        <p className='mt-5 md:mt-2 text-gray-400 max-w-sm'>
            Latest technologies | Weekly Debugging | New Features, projects talks & More!
        </p>
     
        <span className='flex place-items-center bg-gray-200 rounded-full px-5 mt-5 max-w-xs'>
        <MagnifyingGlassIcon className='w-[24px] h-[24px] items-center'/>
        <input type="text" placeholder='Search' className='border-none outline-none  placeholder-black px-5 py-2 items-center bg-transparent'/>
        </span>
        </div>

        <div className='mt-5 lg:mt-0'>
        <SocialIcon url="https://linkedin.com/in/ogbuji-emmanuel" className='mr-3'/>
        <SocialIcon url="https://twitter.com/BujiMiles" />
        </div>
       
    </div>
  )
}

export default Banner