import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface Product {
  product_id: string;
  productName: string;
  productDescription: string,
  category: string,
  price: number,
  quantity: number
  productImage: string
}
interface ProductsState {
  products: Product | null,
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}
const initialState: ProductsState = {
  products: null,
  loading: 'idle',
  error: null
};
export const getSpecificProduct = createAsyncThunk(
  'products/allProducts',
  async (product_id: string) => {
    try {
      const seller_id = localStorage.getItem('seller_id');
      if (!seller_id) {
        throw new Error('seller_id is not found in localStorage');
      }
      // console.log("product_id in action is ", product_id, "seller_id ", seller_id);
      const response = await axios.get(`http://localhost:3060/seller/get-specific-product`, {
        headers: {
          'seller_id': seller_id,
          'product_id': product_id
        },
      });
      // console.log("response is ", response);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response === undefined) {
        throw new Error('Network error: Unable to get products the server');
      }
      else {
        throw error.response.error || error.response.data.error || 'unknown error';
      }
    }
  }
)
const getSpecificProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpecificProduct.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.products = action.payload.productDetail;
        console.log("state.products", state.products);
        // console.log("action is in fullfilled casse", action.payload); 
      })
      .addCase(getSpecificProduct.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message!;
        // console.log("action is ", action);
      });
  },
});
export default getSpecificProductSlice.reducer;