import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../store/ProductList/productSlice';
 
export const store = configureStore({
  reducer: {
    productList: productSlice,
  },
});