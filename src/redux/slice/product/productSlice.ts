import { createSlice } from '@reduxjs/toolkit';
import {addProductToCart, decreaseProduct, fetchProduct, increaseProduct} from './productApi';

interface IProduct {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
}

interface ICart {
  _id: string;
  title: string;
  writer: string;
  tag: string;
  coverImage: string;
  points: number;
  amount: number;
}

type ProductState = {
  products: IProduct[],
  loading: boolean,
  error: string | undefined,
  hasMore: boolean,
  cart: ICart[]
};

const initialState: ProductState = {
  products: [],
  cart: [],
  loading: false,
  error: '',
  hasMore: true
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.hasMore = !!action.payload
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(addProductToCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state:any, action) => {
      state.cart = [action.payload, ...state.cart];
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(decreaseProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(decreaseProduct.fulfilled, (state:any, action) => {
      state.cart = action.payload;
    });
    builder.addCase(decreaseProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(increaseProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(increaseProduct.fulfilled, (state:any, action) => {
      state.cart = action.payload;
    });
    builder.addCase(increaseProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
  }
});

export default productSlice.reducer;
