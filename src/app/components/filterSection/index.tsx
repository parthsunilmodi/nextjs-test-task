import React, { useState } from 'react';

const FilterSection = () => {
  const [ searchText, setSearchText ] = useState<string>('');

  return (
    <>
      <header className="w-full flex flex-wrap items-center pt-12">
        <div className="flex-1 flex justify-between items-center">
          <form className="b-4 w-full md:mb-0 md:w-1/3">
            <label className="hidden" htmlFor="search-form">Search</label>
            <input
              className="border-2 p-2 rounded-lg shadow-inner w-full"
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
