import { combineReducers } from 'redux';
import UserSlice from './users/userSlice';
import ProductSlice from './product/productSlice';

export const rootReducer = combineReducers({
  user: UserSlice,
  product: ProductSlice,
});
