import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface Product {
  productName: string,
  productDescription:string,
  category:string,
  price:number,
  quantity:number,
  image:  File;
  isPhysicalProduct: boolean;
  weight: number;
  weightUnit: string;
  length: number;
  lengthUnit: string;
  width: number;
  widthUnit: string;
  height: number;
  heightUnit: string;
}
interface ProductState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}
const initialState: ProductState = {
  loading: 'idle',
  error: null,
};
export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
  try {
    console.log("product is in acion adding ", product);
    const formData = new FormData();
    formData.append("productName",product.productName)
    formData.append("productDescription", product.productDescription);
    formData.append("category", product.category);
    formData.append("price", String(product.price));
    formData.append("quantity", String(product.quantity));
    formData.append("product_img", product.image);
    formData.append("isPhysicalProduct", product.isPhysicalProduct ? "1" : "0");
    formData.append("weight", String(product.weight));
    formData.append("weightUnit", product.weightUnit);
    formData.append("length", String(product.length));
    formData.append("lengthUnit", product.lengthUnit);
    formData.append("width", String(product.width));
    formData.append("widthUnit", product.widthUnit);
    formData.append("height", String(product.height));
    formData.append("heightUnit", product.heightUnit);
    // console.log("add product in product is ", formData);
    const seller_id = localStorage.getItem('seller_id');
    const response = await axios.post(`http://localhost:3060/seller/add-product/${seller_id}`, formData);
    console.log('response is ', response);
    return response.data;
  } catch (error:any) {
    if(axios.isAxiosError(error) && error.response === undefined){
      throw new Error('Network error: Unable to reach the server');
    }
    else{
      throw error.response.error|| error.response.data.error|| 'unknown error';
    }
  }
});
const addProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductAction: (state, action: PayloadAction<any>) => {
      console.log('Synchronous Action Data:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        toast.success(action.payload.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = 'failed';
        const errorMessage = action.error.message || 'Unknown error occurred';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  },
});
export default addProductSlice.reducer;