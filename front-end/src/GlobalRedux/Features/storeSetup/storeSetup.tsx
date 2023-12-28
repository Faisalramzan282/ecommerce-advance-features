// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// interface StoreSetupState {
//   storeName: string;
//   storeDescription: string;
//   address: string;
//   contact: string;
//   logo: File | null;
// }
// const initialState: StoreSetupState = {
//   storeName: '',
//   storeDescription: '',
//   address: '',
//   contact: '',
//   logo: null,
// };
// export const storeSetup = createAsyncThunk(
//   '/storeSetup/storeSetup',
//   async (storeInfo: StoreSetupState) => {
//     localStorage.setItem('storeInfo', JSON.stringify(storeInfo));
//     return storeInfo;
//   }
// );
// const storeSetupSlice = createSlice({
//   name: 'storeSetup',
//   initialState,
//   reducers: {
//     storeInfoSetup : (state, action: PayloadAction<Object>)=>{
    
//     }
// },
  
// });
// export const {storeInfoSetup} = storeSetupSlice.actions; 
// export default storeSetupSlice.reducer;
