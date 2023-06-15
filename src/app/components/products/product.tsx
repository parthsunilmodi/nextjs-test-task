'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';
import { addProductToCart } from '../../../redux/slice/product/productApi';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {setToast} from "../../../redux/slice/toast/toastSlice";

interface IProduct {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
}

const Product = memo(
  ({ product }: any) => {
    const { cart } = useAppSelector((state) => state.product);
    const { user } = useAppSelector((state) => state.user);
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const Storedcart = JSON.parse(localStorage.getItem('cart')) || cart;

    const handleAddToCart = async () => {
      if (calculateTotal(Storedcart) >= user.points) {
        dispatch(setToast({ visible: true, message: `You don't have enough points to buy the product`, type: 'error' }));
        return null;
      }
      if (isCart(product) > 0) {
        navigate.push('/cart');
      } else {
        await dispatch(addProductToCart({ ...product, amount: 1 }));
        navigate.push('/cart');
      }
    };

    const isCart = (item: IProduct) => {
      return Storedcart?.filter((pro: { _id: string; }) => pro._id === item._id).length;
    };

    const calculateTotal = (items) =>
      items.reduce((acc, item) => acc + item.amount * item.points, 0);

    return (
      <div
        className="product-item bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        key={product._id}
      >
        <div className="w-[100%]">
          <Image
            src={product.coverImage}
            alt="Picture of the author"
            width={222}
            height={222}
          />
        </div>
        <span className="tag text-gray-400 mr-3 capitalize text-xs">{product.tag}</span>
        <div className="px-4 pb-3 w-[100%]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-black truncate block capitalize">{product.title}</p>
              <p className="text-sm font-bold text-black truncate block capitalize">{product.writer}</p>
            </div>
            <div>
              <span className="p-2 text-4xl text-[#3b5998] font-bold">{product.points}</span>
              <p className="text-xs text-[#d0d0d0]">Points</p>
            </div>
          </div>
          <div
            className="add-cart-wrapper w-full text-white bg-[#3b5998] p-2 flex justify-center rounded-lg mt-3 text-center cursor-pointer"
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon
              className="mr-2 w-[20px] h-[30px]"
              icon={faShoppingCart}
              color="white"
              size="lg"
            />
            Add to Cart
          </div>
        </div>
      </div>
    );
  }
);

Product.displayName = 'Product';

export default Product;
