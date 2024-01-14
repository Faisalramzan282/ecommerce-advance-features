import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Router from 'next/router';
interface StoreSetupState {
  storeName: string;
  storeDescription: string;
  address: string;
  contact: string;
  logo: File | null;
}
const initialState: StoreSetupState = {
  storeName: '',
  storeDescription: '',
  address: '',
  contact: '',
  logo: null,
};
export const storeSetup = createAsyncThunk(
  'storeSetup/storeSetup',
  async (payload: {formData: FormData, seller_id:string}, { dispatch }) => {
    try {
      const {formData, seller_id} = payload;
      formData.append('seller_id',seller_id);
      const { data } = await axios.post('http://localhost:3060/user/store-setup', formData);
    } catch (error) {
      console.error('Error in storeSetup async thunk:', error);
      throw error
    }
  }
);
const storeSetupSlice = createSlice({
  name: 'storeSetup',
  initialState,
  reducers: {
    storeInfoSetup: (state, action: PayloadAction<StoreSetupState>) => {
      console.log('Synchronous Action Data:', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeSetup.pending, (state, action) => {
      console.log("actions in pending async Thunk==>", action);
    });
    builder.addCase(storeSetup.fulfilled, (state, action) => {
      const seller_id = localStorage.getItem('seller_id');
      Router.push(`dashboard/${seller_id}`);
      console.log('Async Thunk Fulfilled Data:', action);
    });
    builder.addCase(storeSetup.rejected, (state, action) => {
      console.error('Async Thunk Rejected:', action);
      alert(action.error.message);
    });
  },
});
export default storeSetupSlice.reducer;
