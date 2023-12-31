import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCart, cancelOrder,
  decreaseProduct,
  fetchProduct,
  getOrder,
  increaseProduct,
  orderCheckout,
  removeProductFromCart
} from './productApi';
import {array} from "yup";

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
  cart: ICart[],
  orderSuccess: boolean,
  order: any
  searchText: string;
};

const initialState: ProductState = {
  products: [],
  cart: [],
  loading: false,
  error: '',
  hasMore: true,
  orderSuccess: false,
  order: [],
  searchText : ''
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
     setSearchText : (state,action)=>{
        state.searchText = action.payload;
     }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      // @ts-ignore
      const { page , data= [] } = action.payload;
      state.loading = false;
      state.products = data && page !== 1 ? [...state.products, ...data] : (data && page === 1) ? data :state.products;
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
      const cartItem =JSON.parse(localStorage.getItem('cart') || '[]');
      localStorage.setItem('cart', JSON.stringify([action.payload, ...cartItem]));
      state.loading = false;
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(decreaseProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(decreaseProduct.fulfilled, (state:any, action) => {
      state.loading = false;
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    });
    builder.addCase(decreaseProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(increaseProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(increaseProduct.fulfilled, (state:any, action) => {
      state.loading = false;
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    });
    builder.addCase(increaseProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(orderCheckout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(orderCheckout.fulfilled, (state:any, action) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify([]));
      state.orderSuccess = true;
      state.loading = false;
    });
    builder.addCase(orderCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(getOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state:any, action) => {
      const { page , data= [] } = action.payload;
      state.order = data && page !== 1 ? [...state.order, ...data] : (data && page === 1) ? data : state.order;
      state.loading = false;
      state.hasMore = !!action.payload
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(removeProductFromCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeProductFromCart.fulfilled, (state:any, action) => {
      const cartItem =JSON.parse(localStorage.getItem('cart') || '[]');
      state.cart = cartItem.filter((item: ICart) => item._id !== action.payload._id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      state.loading = false;
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
    builder.addCase(cancelOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(cancelOrder.fulfilled, (state:any, action) => {
      state.loading = false;
      const index = state.order?.findIndex((item: any) => item._id === action.payload._id);
      if (index !== -1) {
        state.order[index] = action.payload;
      }
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    });
  }
});

export const { setSearchText} = productSlice.actions
export default productSlice.reducer;
