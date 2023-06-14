import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
  const orderState = [];

  return (
    <div className="bg-white p-4 sm:p-10" style={{minHeight: "150px"}}>
      <Link href="/" className="flex content-center mb-8 text-indigo-800">
        <FontAwesomeIcon className="mt-2 mr-2" icon={faArrowLeft} size="lg"/>
        <span className="font-bold text-2xl">Back</span>
      </Link>
      <h1 className="text-indigo-800 text-5xl font-bold mb-8">My Order</h1>
      {orderState.length === 0 ? (
        <h3 className="text-gray-500 text-lg font-bold">There is no order</h3>
      ) : (
        <div>
          {orderState
            .reverse()
            .map(({items, total, email, createAt}, index) => (
              <div
                className="w-full flex flex-col p-8 mb-4 rounded shadow-lg"
                key={index}
              >
                <div className="text-indigo-800 font-bold text-lg">
                  {createAt.toString()}
                </div>
                <div className="w-full mb-8">
                  <div className="text-gray-600 font-bold text-right text-3xl">
                    $ {total}
                  </div>
                  <div className="text-gray-600 text-right">{email}</div>
                </div>
                <div className="w-full">
                  {items.map(({id, title, price, qty}) => (
                    <div
                      className="flex justify-between items-center mb-1"
                      key={id}
                    >
                      <div className="text-indigo-800 font-bold text-2xl">
                        {title}
                      </div>
                      <div>
                        <span className="font-bold text-2xl">$ {price}</span> x{" "}
                        <span className="font-bold text-2xl">{qty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Order;
