import React from 'react';

const Spinner = () => {
  return (
    <>
      <div className="flex flex-col items-center relative top-[250px] z-12">
        <svg
          className="animate-spin -ml-1 mr-3 h-[40px] w-[40px] text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-10" stroke="currentColor" stroke-width="4" cx="12" cy="12" r="10">
          </circle>
          <path
            className="opacity-100"
            fill="white"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
    </>
  )
};

export default Spinner;
