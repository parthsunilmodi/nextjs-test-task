import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'
import request from "axios";

interface IPagination {
  page: number;
  limit: number
}

interface ICartProduct {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
  amount: number;
}

export const fetchProduct = createAsyncThunk(
  '/fetchProduct',
  async ({page, limit}: IPagination) => {
    try {
      const response = await axiosInstance.get(`/books?page=${page}&limit=${limit}`);
      return response.data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
   
  },
);

export const addProductToCart = createAsyncThunk(
  '/addProductToCart',
  async (data:ICartProduct[]) => {
    try {
        return data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
    
  },
);

export const decreaseProduct = createAsyncThunk(
  '/decreaseProduct',
  async (data:ICartProduct[]) => {
    try {
      return data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
    
  },
);

export const increaseProduct = createAsyncThunk(
  '/increaseProduct',
  async (data:ICartProduct[]) => {
    try {
      return data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.message)
      }
    }
    
  },
);



