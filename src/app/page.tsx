'use client';
import React from 'react';
import NavBar from '../app/components/nav-bar';
import ProductList from '../app/components/products/index';
import WithAuth from '../components/Auth';

const Home = () => {
  return (
    <WithAuth isProtected={true}>
      <NavBar />
      <div className="h-screen bg-[#dfe3ee]">
        <ProductList />
      </div>
    </WithAuth>
  );
};


export default Home;
