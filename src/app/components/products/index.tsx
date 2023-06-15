import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProduct } from '../../../redux/slice/product/productApi';
import FilterSection from '../filterSection';
import InfiniteScroll from 'react-infinite-scroll-component';
import Product from './product';
import './product.css';

interface IProduct {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
}

interface IProductList {
  products: IProduct[],
  loading: boolean,
  error: string | undefined,
  hasMore: boolean
  searchText : string
}

const ProductList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { products, hasMore, searchText }: IProductList = useAppSelector((state) => state.product);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBooks = async () => {
    await dispatch(fetchProduct({ page: page, limit: 20, searchText }));
    setPage((prevState) => prevState + 1);
  };

  useEffect(()=>{
    setPage(2);
    dispatch(fetchProduct({ page: 1, limit: 20, searchText }));
  },[searchText]);

  return (
    <InfiniteScroll next={async () => {
      await getBooks();
    }} hasMore={hasMore} loader={false} dataLength={products?.length} scrollThreshold={0.80}>
      <div className="flex w-[100%] justify-center bg-[#dfe3ee] h-[calc(100vh - 120px)]">
        <div className="flex flex-col justify-center gap-2 mt-[68px] w-full md:px-28">
          <FilterSection />
          <div className="product flex flex-col sm:flex-row flex-wrap mb-10 my-10 justify-center gap-[32px]">
            {products?.map((item: IProduct) => (
              <Product
                key={item._id}
                product={item}
              />
            ))}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default ProductList;
