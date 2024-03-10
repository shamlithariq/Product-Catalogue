import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
 
export const getProductList = createAsyncThunk('product/getProductList', async (limit ) => {
  try {
    const productList = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
    return productList.data;
  } catch (error) {
    console.log(error);
  }
});

export const getProductCat = createAsyncThunk('product/getProductCat', async (limit ) => {
  try {
    const prodCat = await axios.get(`https://fakestoreapi.com/products/categories`);
    return prodCat.data;
  } catch (error) {
    console.log(error);
  }
});