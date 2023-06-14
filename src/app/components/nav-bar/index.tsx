import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faRightFromBracket,
  faBagShopping,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <>
      <header className="lg:px-16 px-8 flex flex-wrap items-center py-4 bg-[#dfe3ee]">
        <div className="flex-1 flex justify-between items-center">
          <h1 className="leading-none text-2xl text-grey-darkest">
            <Link className="no-underline text-[#3b5998] text-4xl font-bold" href="/">
              Book Store
            </Link>
          </h1>
        </div>
    
        <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
          <FontAwesomeIcon
            icon={faBars}
            className="h-[30px] w-[30px] text-[#3b5998]"
          />
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle"/>
    
        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li>
                <Link className="md:p-4 py-3 px-0 flex items-center" href="/order">
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[20px]"
                    icon={faBagShopping}
                    color="#3b5998"
                    size="lg"
                  />
                  <span className="inline md:flex justify-center items-center text-xl font-semibold text-[#3b5998]">
              My Order
            </span>
                </Link>
              </li>
              <li>
                <Link className="md:p-4 py-3 px-0 flex items-center" href="/cart">
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[30px]"
                    icon={faShoppingCart}
                    color="#3b5998"
                    size="lg"
                  />
                  <span className="inline md:flex justify-center items-center text-xl font-semibold text-[#3b5998]">
              Cart
            </span>
                </Link>
              </li>
              <li>
                <Link className="md:p-4 py-3 px-0 flex items-center" href="/login">
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[30px]"
                    icon={faRightFromBracket}
                    color="#3b5998"
                    size="lg"
                  />
                  <span
                    className="inline md:flex justify-center items-center text-xl font-semibold text-[#3b5998]">
              Log Out
            </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
};

export default NavBar;
