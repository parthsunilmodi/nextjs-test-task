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

const Order = () => {
  const dispatch = useAppDispatch();
  const [ page, setPage ] = useState(1);
  const [orders, setOrders] = useState([]);
  const { order, hasMore, loading } = useAppSelector((state) => state.product)
  
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
    await dispatch(getOrder({page: page, limit: 20}));
    setPage(page + 1);
  };
  
  useEffect(() => {
    setOrders([ ...order, ...orders ])
  }, [ order ]);

  return (
    <InfiniteScroll next={async() => {
      await getOrders()
    }} hasMore={hasMore} loader={loading} dataLength={orders?.length} scrollThreshold={0.80}>
      <div className="bg-white p-4 sm:p-10" style={{minHeight: "150px"}}>
        <Link href="/" className="flex content-center mb-8 text-indigo-800">
          <FontAwesomeIcon className="mt-2 mr-2" icon={faArrowLeft} size="lg"/>
          <span className="font-bold text-2xl">Back</span>
        </Link>
        <h1 className="text-indigo-800 text-5xl font-bold mb-8">My Order</h1>
        {order.length === 0 ? (
          <h3 className="text-gray-500 text-lg font-bold">There is no order</h3>
        ) : (
          <div>
            {order.length > 0 && order?.map(({books, _id, total, isCancel}, index) => (
              <div
                className="w-full flex flex-col p-4 mb-4 rounded shadow-md border-2"
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
                    Total : <span className="text-gray-600 font-bold text-right text-2xl">  {total} </span>
                    {!isCancel && <button className="bg-[#FF0000] p-2 rounded text-white" onClick={() => handleCancelOrder(_id)}>Cancel Order</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Order;
