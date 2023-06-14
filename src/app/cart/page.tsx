'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faArrowLeft, faMinusCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WithAuth from "../../components/Auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { decreaseProduct, increaseProduct } from "../../redux/slice/product/productApi";

interface ICart {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
  amount: number;
}

const Cart = () => {
  const {cart} = useAppSelector((state) => state.product);
  const [ openCheckoutModal, setCheckoutModal ] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleIncrement = (item: ICart) => {
    const data = cart.map((product: {_id: string; amount: number;}) => {
      if (item._id === product._id) {
        return {
          ...product,
          amount: product.amount + 1
        }
      } else {
        return product
      }
    });
    dispatch(increaseProduct(data))
  };

  const handleDecrease = (item: ICart) => {
    const data = cart.map((product: { _id: string; amount: number; }) => {
      if (item._id === product._id) {
        return {
          ...product,
          amount: product.amount - 1
        }
      } else {
        return product
      }
    });
    dispatch(decreaseProduct(data))
  };

  return (
    <WithAuth>
      <div
        className={
          openCheckoutModal
            ? "bg-white p-4 sm:p-10 w-full fixed overflow-hidden"
            : "bg-white p-4 sm:p-10"
        }
        style={{minHeight: "150px"}}
      >
        <Link href="/" className="flex content-center mb-8 text-indigo-800">
          <FontAwesomeIcon className="mt-2 mr-2" icon={faArrowLeft} size="lg"/>
          <span className="font-bold text-2xl">Back</span>
        </Link>
        <h1 className="text-indigo-800 text-5xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <h3 className="text-gray-500 text-lg font-bold">Cart is empty</h3>
        ) : (
          <div>
            <h2 className="mb-16 text-4xl font-bold w-full text-right">
              Total: $ 10
            </h2>
            {cart?.map((item: ICart, id: string | number | null | undefined) => (
              <div
                key={id}
                className="relative w-full flex mb-4 rounded shadow-lg p-5 items-center"
              >
                <Image src={item.coverImage} height={100} width={100} alt={item.title} className="w-32"/>
                <div className="p-8 w-full bg-white flex flex-col justify-between leading-normal">
                  <h1 className="text-5xl font-bold text-indigo-800">{item.title}</h1>
                  <div className="text-lg font-bold">
                    <span className="text-2xl">$ {item.points}</span> x{" "}
                    <span className="text-2xl">{item.amount}</span>
                  </div>
                </div>
                <div className="flex items-center justify-evenly p-2 w-[50%] gap-3 border-1 rounded-lg h-14">
                  <FontAwesomeIcon icon={faMinus} className="bg-[#3b5998] p-3 rounded text-white"
                                   onClick={() => handleDecrease(item)}/>
                  {item.amount}
                  <FontAwesomeIcon icon={faPlus} className="bg-[#3b5998] p-3 rounded text-white"
                                   onClick={() => handleIncrement(item)}/>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    color="#c53030"
                    size="2x"
                  />
                </div>
              </div>
            ))}
            <button
              className="mt-8 w-full font-bold bg-[#3b5998] rounded-lg p-4 text-white text-lg"
              onClick={() => setCheckoutModal(true)}
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </WithAuth>
  );
};

export default Cart;
