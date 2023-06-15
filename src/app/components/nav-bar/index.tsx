import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faRightFromBracket,
  faBagShopping,
  faBars,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logOutUser } from '../../../redux/slice/users/usersApi';
import './navbar.css';

interface ICart {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
  amount: number;
}

const NavBar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const cart: ICart[] | [] = JSON.parse(localStorage.getItem('cart') || '[]');

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <header className="lg:px-16 px-8 flex flex-wrap items-center py-2 bg-[#3b5998] w-[100%] z-10 fixed">
        <div className="flex-1 flex justify-between items-center">
          <h1 className="leading-none text-2xl text-grey-darkest">
            <Link className="no-underline text-white text-4xl font-bold" href="/">
              Bookify store
            </Link>
          </h1>
        </div>
        <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
          <FontAwesomeIcon
            icon={faBars}
            className="h-[30px] w-[30px] text-white"
          />
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0 header-controls">
              <li className="relative">
                <Link className="md:p-4 py-3 px-0 flex items-center" href="/cart">
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[30px]"
                    icon={faShoppingCart}
                    color="white"
                    size="lg"
                  />
                  {
                    !!cart.length && (
                      <span className="point-badge">
                        {cart.length}
                      </span>
                    )
                  }
                </Link>
              </li>
              <li>
                <Link className="md:p-4 py-3 px-0 flex items-center" href="/order">
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[20px]"
                    icon={faBagShopping}
                    color="white"
                    size="lg"
                  />
                  <span className="inline md:flex justify-center items-center text-xl text-white text-xs">
                    My Order
                  </span>
                </Link>
              </li>
              <li>
                <div className="md:p-4 py-3 px-0 flex items-center cursor-pointer">
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[30px]"
                    icon={faUser}
                    color="white"
                    size="lg"
                  />
                  <span className="inline md:flex justify-center items-center text-xl text-white text-xs">
                    Points: {user.points}
                  </span>
                </div>
              </li>
              <li>
                <Link className="md:p-4 py-3 px-0 flex items-center" href="/login" onClick={handleLogOut}>
                  <FontAwesomeIcon
                    className="mr-2 w-[20px] h-[30px]"
                    icon={faRightFromBracket}
                    color="white"
                    size="lg"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
