import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
interface storeInfo {
  profileUrl: string;
  storeName: string;
  storeDescription: string;
}
interface ProfileState {
  data: storeInfo | null;
  loading: boolean;
  error: string | null;
}
const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};
const getProfile = createAsyncThunk<storeInfo, string>(
    'getProfile/getProfile',
    async (seller_id:string) => {
      try {
        const response = await axios.get('http://localhost:3060/seller/get-profile', {
            headers: {
              'X-Seller-ID': seller_id,
            },
          });
        const storeInfo = response.data.data;
        // console.log("storeInfo in createAsyncThunk is ===> ", storeInfo);
        return storeInfo;
      } catch (error) {
        throw error;
      }
    }
);
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      // Additional synchronous reducers can be added here if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          // console.log("state in pending is ", state);
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          // console.log("state.payloadin reducer asynchronous ===>", action.payload)
          state.data = action.payload;
          // console.log("state.data it is ======>  \n", state.data);
          // console.log("state in fullfillled is ", action);
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message!;
          // console.log("state in rejected is ===>", action);
        });
    },
});
export { getProfile };
export default profileSlice.reducer;