import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
interface Product {
  product_id: number
  productName: string;
  productDescription: string,
  category: string,
  price: number,
  quantity: number,
  image: File | null ,
  isPhysicalProduct: boolean,
  weight: number,
  weightUnit: string,
  length: number,
  lengthUnit: string ,
  width: number,
  widthUnit: string,
  height: number,
  heightUnit: string ,
}
interface productState{
  products: Product | null,
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
  status: number
}
const initialState: productState = {
    products: null,
    loading: 'idle',
    error: null,
    status: 0
  };
  export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (productForm: Product) => {
      try {
        const seller_id = localStorage.getItem('seller_id');
        const formData = new FormData();
        formData.append("productName", productForm.productName);
        formData.append("productDescription", productForm.productDescription);
        formData.append("category", productForm.category);
        formData.append("price", String(productForm.price));
        formData.append("quantity", String(productForm.quantity));
        formData.append("product_img", productForm.image!);
        formData.append("isPhysicalProduct", productForm.isPhysicalProduct ? "1" : "0");
        formData.append("weight", String(productForm.weight));
        formData.append("weightUnit", productForm.weightUnit);
        formData.append("length", String(productForm.length));
        formData.append("lengthUnit", productForm.lengthUnit);
        formData.append("width", String(productForm.width));
        formData.append("widthUnit", productForm.widthUnit);
        formData.append("height", String(productForm.height));
        formData.append("heightUnit", productForm.heightUnit);
        const response = await axios.put("http://localhost:3060/seller/update-product", formData,
        {headers:{
          'Content-Type': 'multipart/form-data',
          'seller_id': seller_id,
          'product_id': productForm.product_id
        }});
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response === undefined) {
          throw new Error('Network error: Unable to Update product');
        }
        else {
          throw error.response.error || error.response.data.error || 'unknown error';
        }
      }
    }
  );
const updateProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      updateProductStatus:(state)=>{
        state.status = 0;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateProduct.pending, (state) => {
          state.loading = 'pending';
          state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = 'fulfilled';
          state.status = action.payload.status;
          toast.success(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.loading = 'rejected';
          state.error = action.error.message!;
          toast.error(state.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });
export const {updateProductStatus} = updateProductSlice.actions;
export default updateProductSlice.reducer;