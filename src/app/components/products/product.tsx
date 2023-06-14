"use client";
import React, { memo } from 'react';
import Image from 'next/image';
import loginBg from "../../../assets/img/sign-up.jpeg";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/navigation";
import {addProductToCart} from "../../../redux/slice/product/productApi";

interface IProduct {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
}

const Product = memo(
  ({product}: any) => {
    const { cart } = useAppSelector((state) => state.product)
    const { user } = useAppSelector((state) => state.user)
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    
    const handleAddToCart = async () => {
      if(isCart(product) > 0) {
        navigate.push('/cart')
      } else {
        await dispatch(addProductToCart({...product, amount: 1}));
        navigate.push('/cart')
      }
    };
  
    const isCart = (item: IProduct) => {
      return cart?.filter((pro: { _id: string; }) => pro._id === item._id).length
    };
    
    const calculateTotal = (items) =>
      items.reduce((acc, item) => acc + item.amount * item.points, 0);
    
    return (
	    <div
		    className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
		    key={product._id}
	    >
        <div className="flex justify-center mt-5">
          <Image
            src={product.coverImage}
            alt="Picture of the author"
            width={222}
            height={222}
          />
        </div>
		    <div className="px-4 py-3 w-72">
			    <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
			    <p className="text-lg font-bold text-black truncate block capitalize">{product.title}</p>
			    <p className="text-lg font-bold text-black truncate block capitalize">{product.writer}</p>
			    <div className="w-full text-white bg-[#8b9dc3] p-4 flex justify-between content-center rounded-lg">
            {
              isCart(product) > 0 ?
                <button
                  className="border-white font-bold border-2 px-4 rounded-full hover:bg-white hover:text-indigo-900"
                  onClick={() => handleAddToCart()}
                >
                  Go to Cart
                </button>
                : <button
                  className="border-white font-bold border-2 px-4 rounded-full hover:bg-white hover:text-indigo-900"
                  onClick={() => handleAddToCart()}
                  disabled={(calculateTotal(cart) >= user.points)}
                >
                  Add to Cart
                </button>
            }
				    <span className="p-2 text-xl">Points: {product.points}</span>
			    </div>
		    </div>
	    </div>
    );
  }
);

export default Product;
