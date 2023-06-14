'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faArrowLeft, faMinusCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  decreaseProduct,
  increaseProduct,
  orderCheckout,
  removeProductFromCart
} from "../../redux/slice/product/productApi";
import { useRouter } from "next/navigation";

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
  const { cart } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useRouter();
  const dispatch = useAppDispatch();


  const handleIncrement = (item:ICart) => {
    const data = cart.map((product) => {
      if(item._id === product._id) {
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

  const handleDecrease = (item:ICart) => {
    const data = cart.map((product) => {
      if(item._id === product._id) {
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

  const handleCheckout = async () => {
    const cartItems = cart.map((item) => {
      return {bookId: item._id, quantity: item.amount}
    });
    const response = await dispatch(orderCheckout({books: cartItems }));
    if(response.payload.status === 201 || 200) {
      navigate.push('/order')
    }
  };

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.points, 0);

  const handleRemoveItem = (item: ICart ) => {
    dispatch(removeProductFromCart(item))
  };

  return (
    <div className="flex w-[100%] h-[100vh] bg-[#dfe3ee]">
      <div
        className={"p-4 sm:p-10 w-[100%]"}
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
              Total: {calculateTotal(cart).toFixed(2)}
            </h2>
            {cart?.map((item: ICart, id: string | number | null | undefined) => (
              <div
                key={id}
                className="bg-white relative w-full flex mb-4 rounded shadow-lg p-5 items-center"
              >
                <Image src={item.coverImage} height={100} width={100} alt={item.title} className="w-32"/>
                <div className="p-8 w-full bg-white flex flex-col justify-between leading-normal">
                  <h1 className="text-5xl font-bold text-indigo-800">{item.title}</h1>
                  <div className="text-lg font-bold">
                    <span className="text-2xl">$ {item.points}</span> x{" "}
                    <span className="text-2xl">{item.amount}</span>
                    <span className="text-2xl">{(item.amount * item.points).toFixed(2)}</span>

                  </div>
                </div>
                <div className="flex items-center justify-evenly p-2 w-[50%] gap-3 border-1 rounded-lg h-14">
                  <button onClick={() => handleDecrease(item)} disabled={item.amount < 2}>
                    <FontAwesomeIcon icon={faMinus} className="bg-[#3b5998] p-3 rounded text-white"/>
                  </button>
                  {item.amount}
                  <button onClick={() => handleIncrement(item)} disabled={calculateTotal(cart) >= user.points}>
                    <FontAwesomeIcon icon={faPlus} className="bg-[#3b5998] p-3 rounded text-white"/>
                  </button>
                  <button onClick={() => handleRemoveItem(item)}>
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      color="#c53030"
                      size="2x"
                    />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="mt-8 w-full font-bold bg-[#3b5998] rounded-lg p-4 text-white text-lg"
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
