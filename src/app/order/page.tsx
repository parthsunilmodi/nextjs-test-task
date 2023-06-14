"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {cancelOrder, getOrder} from "../../redux/slice/product/productApi";
import {getUser} from "../../redux/slice/users/usersApi";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/spinner";

const Order = () => {
  const dispatch = useAppDispatch();
  const [ page, setPage ] = useState(1);
  const [orders, setOrders] = useState([]);
  const { order, hasMore, loading } = useAppSelector((state) => state.product)
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelOrder = async (id: string) => {
    const response = await dispatch(cancelOrder(id));
    if (response.status === 200 || 201) {
      dispatch(getUser());
    }
  };
  
  useEffect(() => {
    getOrders()
  }, []);
  
  const getOrders = async () => {
    setIsLoading(true)
    await dispatch(getOrder({page: page, limit: 10}));
    setPage(page + 1);
    setIsLoading(false)
  };
  
  useEffect(() => {
    setOrders([ ...orders, ...order ])
  }, [ order ]);

  return (
    <div className="bg-[#dfe3ee] sm:p-10" style={{minHeight: "150px"}}>
      <Link href={'/'} className="flex content-center mb-8 text-indigo-800">
        <FontAwesomeIcon className="mt-2 mr-2" icon={faArrowLeft} size="lg"/>
        <span className="font-bold text-2xl">Back</span>
      </Link>
       <h1 className="text-indigo-800 text-5xl font-bold mb-8">My Order</h1>
      {order.length === 0 ? (
        !loading && <h3 className="text-gray-500 p-4 text-lg font-bold">There is no order</h3>
      ) : (
        <InfiniteScroll next={async() => {
          await getOrders()
        }} hasMore={hasMore} loader={false} dataLength={order?.length} scrollThreshold={0.80}>
          <div>
          {order.length > 0 && order?.map(({books, _id, total, isCancel}, index) => (
            <div
              className="w-full bg-white flex flex-col p-4 mb-4 rounded shadow-md border-2"
              key={index}
            >
              <div className="w-full flex flex-col gap-2">
                {books.map(({_id, title, points, quantity, coverImage}) => (
                  <div
                    className="flex justify-between items-center mb-1"
                    key={_id}
                  >
                    <div className="text-indigo-800 font-bold text-2xl flex gap-2">
                      <Image src={coverImage} height={30} width={30} alt="img"/>
                      {title}
                    </div>
                    <div>
                      Points: <span className="font-bold text-2xl">{points}{" "}</span>x{" "}
                      <span className="font-bold text-2xl">{quantity}</span>{" "}:Quality
                    </div>
                  </div>
                ))}
                <hr/>
                <div className="text-right flex gap-5 items-center justify-end">
                  Total : <span className="text-gray-600 font-bold text-right text-2xl"> {total} </span>
                  {!isCancel && <button className="bg-[#FF0000] p-2 rounded text-white" onClick={() => handleCancelOrder(_id)}>Cancel Order</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
        </InfiniteScroll>
      )}
      { loading && <Spinner />}
    </div>
  );
};

export default Order;
