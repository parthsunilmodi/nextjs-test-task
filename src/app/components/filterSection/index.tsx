import React, { useState } from 'react';
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setSearchText} from "@/redux/slice/product/productSlice";

interface IProductList {
  searchText:string
}
const FilterSection = () => {
  const dispatch = useAppDispatch();
  const { searchText }: IProductList = useAppSelector((state) => state.product);
  const handleOnSearchInputChange = ( e: React.ChangeEvent<HTMLInputElement>)=> {
    dispatch(setSearchText( e.target.value || '' ))
  }

  return (
    <>
      <header className="w-full flex flex-wrap items-center pt-12">
        <div className="flex-1 flex justify-between items-center mx-8">
          <form className="b-4 w-full md:mb-0 md:w-1/3">
            <label className="hidden" htmlFor="search-form">Search</label>
            <input
              className="border-2 p-2 rounded-lg shadow-inner w-full"
              placeholder="Search"
              type="text"
              value={searchText}
              onChange={handleOnSearchInputChange}
            />
            <button className="hidden">Submit</button>
          </form>
        </div>
      </header>
    </>
  )
};

export default FilterSection;
