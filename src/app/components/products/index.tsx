import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchProduct } from "../../../redux/slice/product/productApi";
import FilterSection from "../filterSection";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from './product';
import Spinner from "../spinner";
import { useSelector } from "react-redux";

interface IProduct {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
}

interface ICart {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
  amount: number;
}

interface IProductList {
  products: IProduct[],
  loading: boolean,
  error: string | undefined,
  hasMore: boolean
}

const ProductList = () => {
  const dispatch = useAppDispatch();
  const [ page, setPage ] = useState(1);
  const [ product, setProduct ] = useState<any>([]);
  const {products, hasMore, loading}: IProductList = useAppSelector((state) => state.product);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async() => {
    await dispatch(fetchProduct({page: page, limit: 20}));
    setPage(page + 1);
  };

  useEffect(() => {
    setProduct([ ...product, ...products ])
  }, [ products ]);

  // @ts-ignore
  return (
    <InfiniteScroll next={async() => {
      await getBooks()
    }} hasMore={hasMore} loader={loading} dataLength={product?.length} scrollThreshold={0.80}>
      {loading ? <Spinner/> : null}
      <div className="flex bg-[#dfe3ee] w-[100%] justify-center">
        <div className="flex flex-col justify-center mt-[70px]">
          <div className="">
            <FilterSection/>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap mb-10 m-10 gap-[32px] justify-center">
            {product?.map((item: IProduct) => (
              <Product
                product={item}
              />
            ))}
          </div>
        </div>
      </div>

    </InfiniteScroll>
  )
};

export default ProductList;
