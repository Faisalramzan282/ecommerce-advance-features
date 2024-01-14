import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface UserRegistrationState {
  errors: string[];
  status: number;
}
const initialState: UserRegistrationState = {
  errors: [],
  status: 0
};
export const registerUser = createAsyncThunk(
  'userRegistration/registerUser',
  async (payload: { email: string; password: string, username:string }, { dispatch }) => {
    try {
      console.log("uuuuu====>", payload);
      const { data } = await axios.post('http://localhost:3060/user/register', payload);
      if (data.status === 200){
        dispatch(registrationSuccess(data.message));
      } 
    } catch (error:any) {
      if (error.response ) {
        dispatch(registrationFailure(error.response.data.message));
      }
      else if (error.request) {
        dispatch(registrationFailure("Server Error"));
      } else {
        alert(error);
      }
    }
  }
);
const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState,
  reducers: {
    registrationSuccess: (state, action: PayloadAction<string>) => {
      state.errors = [];
      state.status = 200;
      alert(action.payload);
    },
    registrationFailure: (state, action: PayloadAction<string>) => {
      state.errors.push(action.payload);
    },
    resetError: (state) => {
      state.errors = [];
    },
    resetStatus:(state, action: PayloadAction<string>)=>{
      state.status =parseInt(action.payload);
    }
  },
});
export const { registrationSuccess, registrationFailure, resetStatus, resetError } = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer;