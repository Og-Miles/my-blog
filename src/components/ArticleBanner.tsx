import React from "react";
function ArticleBanner() {
  return (
    <div className='mb-5 flex-flex-col max-w-7xl px-10 mx-auto'>
      <div className='flex items-center gap-0 mb-5'>
        <hr className='w-full border-gray-400' />
        <p className='text-center font-bold text-2xl w-[281px]'>Articles</p>
        <hr className='w-full border-gray-400' />
      </div>
    </div>
  );
}

export default ArticleBanner;
