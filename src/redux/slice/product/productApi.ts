import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'
import request from "axios";

interface IPagination {
  page: number;
  limit: number;
  searchText:string;
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
  async ({page, limit, searchText = ''}: IPagination) => {
    try {
      const response = await axiosInstance.get(`/books?page=${page}&limit=${limit}&search=${searchText}`);
      return { data : response.data, page: page }
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);

export const addProductToCart = createAsyncThunk(
  '/addProductToCart',
  async (data:any) => {
    try {
        return data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);

export const decreaseProduct = createAsyncThunk(
  '/decreaseProduct',
  async (data:any) => {
    try {
      return data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);

export const increaseProduct = createAsyncThunk(
  '/increaseProduct',
  async (data:any) => {
    try {
      return data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);

export const orderCheckout = createAsyncThunk(
  '/orderCheckout',
  async (data:any) => {
    try {
      const response = await axiosInstance.post(`/orders`, data);
      return response.data;
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);


export const getOrder = createAsyncThunk(
  '/getOrder',
  async ({page, limit}: IPagination) => {
    try {
      const response = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
      return response.data
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);


export const removeProductFromCart = createAsyncThunk(
  '/removeProductFromCart',
  async (item:any) => {
    try {
      return item
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);

export const cancelOrder = createAsyncThunk(
  '/cancelOrder',
  async (data:string) => {
    try {
      const response = await axiosInstance.get(`/orders/cancel/${data}`);
      return response.data;
    } catch (e) {
      if (request.isAxiosError(e) && e.response) {
        throw new Error(e.response.data.message)
      }
    }
  },
);

