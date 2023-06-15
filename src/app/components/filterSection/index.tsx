import React from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchText } from "@/redux/slice/product/productSlice";

interface IProductList {
  searchText:string
}
const FilterSection = () => {
  const dispatch = useAppDispatch();
  const { searchText }: IProductList = useAppSelector((state) => state.product);

  const handleOnSearchInputChange = ( e: React.ChangeEvent<HTMLInputElement>)=> {
    dispatch(setSearchText( e.target.value || '' ))
  };

  return (
    <>
      <header className="w-full flex flex-wrap items-center 2xl:pt-12 2xl:w-[50%] 2xl:pl-[15px]">
        <div className="flex-1 flex justify-between items-center m-[10px] 2xl:m-[20px]">
          <input
            className="border-solid border-1 border-[#3b5998] p-4 rounded-lg shadow-inner w-full h-14"
            placeholder="Search..."
            type="text"
            value={searchText}
            onChange={handleOnSearchInputChange}
          />
        </div>
      </header>
    </>
  )
};

export default FilterSection;
