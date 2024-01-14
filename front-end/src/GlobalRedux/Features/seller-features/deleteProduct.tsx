import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface deleteProductState{
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
    status:number
}
const initialState: deleteProductState={
    loading: 'idle',
    error: null,
    status:0
}
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (product_id:string) =>{
        try {
            const seller_id = localStorage.getItem('seller_id');
            console.log('product_id in action redux', product_id)
            if (!seller_id) {
              throw new Error('seller_id is not found in localStorage');
            }
            const response = await axios.delete(`http://localhost:3060/seller/delete-product/${seller_id}`, {
                data: {
                    product_id: product_id,
                },
                headers:{
                  'Content-Type': 'application/json',
                }
              });
              console.log("response is ", response);
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
const deleteProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetDeleteProductStatus:(state)=>{
      state.status = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.status = action.payload.status;
        console.log("state.data in action  is", state.status);
        console.log("action is in fullfilled casse", action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message!; 
        console.log("in rejected case",action );
    });
  },
});
export const {resetDeleteProductStatus} = deleteProductSlice.actions;
export default deleteProductSlice.reducer;