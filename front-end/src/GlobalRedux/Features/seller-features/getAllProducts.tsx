import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify';
interface Product {
    product_id: string;
    productName: string;
    productDescription:string,
    category:string,
    price: number,
    quantity:number
    productImage:string
}
interface ProductsState {
    products: Product[]| null,
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
  }
const initialState: ProductsState = {
    products: null,
    loading: 'idle',
    error: null
};
export const allProducts = createAsyncThunk(
    'products/allProducts',
    async () =>{
        try {
            const seller_id = localStorage.getItem('seller_id');
            if (!seller_id) {
              throw new Error('seller_id is not found in localStorage');
            }
            const response = await axios.get(`http://localhost:3060/seller//get-all-products`, {
                headers: {
                  'seller-id': seller_id,
                },
              });
              // console.log("response is ", response);
              return response.data;
        }catch (error:any) {
            if(axios.isAxiosError(error) && error.response === undefined){
                throw new Error('Network error: Unable to get products the server');
              }
              else{
                throw error.response.error|| error.response.data.error|| 'unknown error';
              }          
        }
    }
)
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.products = action.payload.allProducts;
        // console.log("action is in fullfilled casse", action.payload);
        toast.success(action.payload.message,{
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.loading = 'rejected';
       state.error =  action.error.message!;
       toast.error(state.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
        // console.log("action is ", action);
      });
  },
});
export default productsSlice.reducer;