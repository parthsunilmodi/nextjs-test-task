import React, { useState } from 'react';

const FilterSection = () => {
  const [ searchText, setSearchText ] = useState<string>('');

  return (
    <>
      <header className="w-full flex flex-wrap items-center 2xl:pt-12 2xl:w-[50%] 2xl:pl-[15px]">
        <div className="flex-1 flex justify-between items-center m-[10px] 2xl:m-[20px]">
          <form className="b-4 w-full md:mb-0">
            <label className="hidden" htmlFor="search-form">Search</label>
            <input
              className="border-2 p-4 rounded-lg shadow-inner w-full h-14"
              placeholder="Search..."
              type="text"
              value={searchText}
              onChange={(e: any) => setSearchText(e.target.value)}
            />
            <button className="hidden">Submit</button>
          </form>
        </div>
      </header>
    </>
  )
};

export default FilterSection;
