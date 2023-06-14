import React, { useState } from 'react';

const FilterSection = () => {
  const [ searchText, setSearchText ] = useState<string>('');

  return (
    <>
      <header className="lg:px-16 px-8 flex flex-wrap items-center py-4 bg-[#dfe3ee]">
        <div className="flex-1 flex justify-between items-center">
          <form className="b-4 w-[100%] md:mb-0 md:w-1/3">
            <label className="hidden" htmlFor="search-form">Search</label>
            <input
              className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full"
              placeholder="Search"
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
