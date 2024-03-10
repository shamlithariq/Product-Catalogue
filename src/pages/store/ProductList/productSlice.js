import { createSlice } from "@reduxjs/toolkit";
import { getProductList, getProductCat } from "./actions";
 
const initialState = {
  data: {
    favProdList: [],
    productList: [],
    pCategories: [],
  },
  isLoading: false,
  isSuccess: false,
  errorMessage: ''
}
 
export const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      const prodDetails = state?.data?.favProdList?.find((pId) => pId === action.payload);
      if(!prodDetails)
      state.data = {...state.data, favProdList:[...state?.data?.favProdList, action.payload]};
      else 
      {
        const updatedFavList = state?.data?.favProdList?.filter((pId) => pId !== action.payload);
        state.data = {...state.data, favProdList: [...updatedFavList]};  
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductList.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getProductList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      state.isSuccess = true;
      state.data = {...state.data, productList:[...payload]};
    })
    .addCase(getProductList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
    })
    builder.addCase(getProductCat.pending, (state) => {  
      state.isLoading = true;
    })
  .addCase(getProductCat.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    state.isSuccess = true;
    state.data = {...state.data, pCategories:[...payload]};
  })
  .addCase(getProductCat.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
  });
  }
});
 
export default productSlice.reducer;

export const {
  addToFavourites,
  getPaginatedProducts,
} = productSlice.actions;