'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { faArrowLeft, faMinusCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  decreaseProduct,
  increaseProduct,
  orderCheckout,
  removeProductFromCart
} from '../../redux/slice/product/productApi';
import Spinner from '../components/spinner';

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
  const { cart, loading } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [bookCart, setBookCart] = useState<ICart[]>([]);
  let localCartData: Object | null = null;

  if (typeof window !== 'undefined') {
    localCartData = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  const cartStore: ICart[] | [] = localCartData || cart;

  useEffect(() => {
    setBookCart(cartStore);
  }, [cart]);

  const handleIncrement = (item: ICart) => {
    const data = bookCart.map((product: ICart) => {
      if (item._id === product._id) {
        return {
          ...product,
          amount: product.amount + 1
        };
      } else {
        return product;
      }
    });
    dispatch(increaseProduct(data));
  };

  const handleDecrease = (item: ICart) => {
    const data = bookCart.map((product: ICart) => {
      if (item._id === product._id) {
        return {
          ...product,
          amount: product.amount - 1
        };
      } else {
        return product;
      }
    });
    dispatch(decreaseProduct(data));
  };


  const handleCheckout = async () => {
    const cartItems = bookCart.map((item: ICart) => {
      return { bookId: item._id, quantity: item.amount };
    });
    const response = await dispatch(orderCheckout({ books: cartItems }));
    if (response.payload.status === 201 || 200) {
      navigate.push('/order');
    }
  };

  const calculateTotal = (items: ICart[]) =>
    items.reduce((acc: number, item: ICart) => acc + item.amount * item.points, 0);

  const handleRemoveItem = (item: ICart) => {
    dispatch(removeProductFromCart(item));
  };

  return (
    <div className="flex w-[100%] h-[100vh] bg-[#dfe3ee]">
      <div
        className={'p-4 sm:p-10 w-[100%]'}
        style={{ minHeight: '150px' }}
      >
        <Link href="/" className="flex content-center mb-8 text-[#3b5998]">
          <FontAwesomeIcon className="mt-2 mr-2" icon={faArrowLeft} size="lg" />
          <span className="font-bold text-xl">Back</span>
        </Link>
        <h1 className="text-xl 2xl:text-3xl font-bold mb-8 text-[#3b5998]">Shopping Cart</h1>

        {bookCart.length === 0 ? (
          <>
            <div className="flex justify-center items-center">
              <p className="text-4xl text-[#f5425a] font-semibold my-[180px] mx-auto"> NO DATA IN CART ! </p>
            </div>
          </>
        ) : (
          <div>
            <h2 className="mb-2 2xl:mb-16 text-xl 2xl:text-4xl font-bold w-full text-right">
              Total: {calculateTotal(bookCart).toFixed(2)}
            </h2>
            {bookCart?.map((item: ICart, id: string | number | null | undefined) => (
              <div
                key={id}
                className="bg-white relative w-full flex flex-col md:flex-row mb-4 rounded shadow-lg p-5 items-center"
              >
                <Image src={item.coverImage} height={100} width={100} alt={item.title} className="w-[100%] 2xl:w-32" />
                <div className="p-[10px] 2xl:p-8 w-full bg-white flex flex-col justify-between leading-normal">
                  <h1 className="text-xl 2xl:text-5xl font-bold text-[#3b5998]">{item.title}</h1>
                  <div className="text-lg font-bold">
                    <span className="text-2xl">$ {item.points}</span> x{' '}
                    <span className="text-2xl">{item.amount}</span> = {' '}
                    <span className="text-2xl">{(item.amount * item.points)}</span>
                  </div>
                </div>
                <div
                  className="flex items-center justify-evenly md:items-start md:justify-start 2xl:items-center p-2 2xl:w-[20%] gap-2 border-1 rounded-lg h-14">
                  <button onClick={() => handleDecrease(item)} disabled={item.amount < 2}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={`${item.amount < 2 ? `bg-[#d3d3d3]` : 'bg-[#3b5998]'} p-3 rounded text-white`}
                    />
                  </button>
                  {item.amount}
                  <button onClick={() => handleIncrement(item)} disabled={calculateTotal(bookCart) >= user.points}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={`${calculateTotal(bookCart) >= user.points ? `bg-[#d3d3d3]` : 'bg-[#3b5998]'} p-3 rounded text-white`}
                    />
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
              className={`mt-8 w-full font-bold ${loading ? `bg-[#d3d3d3]` : 'bg-[#3b5998]'} rounded-lg flex items-center justify-center p-4 text-white text-lg`}
              onClick={handleCheckout}
            >
              {loading && <Spinner />} CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
