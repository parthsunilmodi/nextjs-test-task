import { combineReducers } from 'redux';
import UserSlice from './users/userSlice';
import ProductSlice from './product/productSlice';
import ToastSlice from './toast/toastSlice';

export const rootReducer = combineReducers({
  user: UserSlice,
  product: ProductSlice,
  toast: ToastSlice,
});
