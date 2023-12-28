import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Router from 'next/router';
interface UserAuthenticationState {
  authError: string[];
}
const initialState: UserAuthenticationState = {
  authError: [],
};
export const userAuth = createAsyncThunk(
  'userAuthentication/userAuth',
  async (payload: { email: string; password: string; seller: boolean }, { dispatch }) => {
    try {
      const { data } = await axios.post('http://localhost:3060/user/authenticate', payload);
      // const token = localStorage.setItem('sellerToken', data.token);
      console.log('response is ==>', data);
      if(data.status === 200)
      {
      dispatch(authSuccess(data));
      }
    } catch (error:any) {
      dispatch(authFailure(error.response.data.message));
    }
  }
);
const userAuthenticationSlice = createSlice({
  name: 'userAuthentication',
  initialState,
  reducers: {
    authSuccess: (state, action: PayloadAction<any>) => {
     Router.push('/store-setup');
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.authError.push(action.payload);
    },
    resetAuthError: (state) => {
      state.authError = [];
    },
  },
});
export const { authSuccess, authFailure, resetAuthError } = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;