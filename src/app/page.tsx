'use client';
import React, { useState } from 'react';
import NavBar from '../app/components/nav-bar';
import ProductList from '../app/components/products/index';
import WithAuth from '../components/Auth'
import FilterSection from "./components/filterSection";

const Home = () => {
  return (
    <WithAuth>
      <>
        <NavBar/>
        <ProductList/>
      </>
    </WithAuth>
  );
};


export default Home;
