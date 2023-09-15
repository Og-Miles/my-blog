import React, { useState, useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // This is to calculate the scroll percentage
    const scrollPercentage = (scrollY / windowHeight) * 100;

    // When the user scrolls around 30% or above
    setShowButton(scrollPercentage >= 30);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        showButton ? "block" : "hidden"
      } fixed bottom-4 right-4 z-10`}
    >
      <button
        onClick={scrollToTop}
        className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all duration-300 w-full h-full'
      >
        <ArrowUpCircleIcon className='text-white h-[24px] w-full'  />
      </button>
    </div>
  );
};

export default BackToTopButton;
