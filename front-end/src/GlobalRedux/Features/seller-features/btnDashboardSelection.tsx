import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ProductFormState {
  productName: string;
  productDescription: string;
  category: string;
  price: number;
  quantity: number;
}
interface SidebarState {
  selectedButton: string | null;
  addProductFormData: ProductFormState| null;
  product_id:string
}
const initialState: SidebarState = {
  selectedButton: null,
  addProductFormData: null,
  product_id:''
};
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelectButton: (state, action: PayloadAction<string | null>) => {
      state.selectedButton = action.payload;
      console.log("set selected button in redux actuons", state.selectedButton);
    },
    setAddProductFormData:(state, action: PayloadAction<{ buttonName: string | null; addProductFormData: ProductFormState | null }>) =>{
      state.selectedButton = action.payload.buttonName;
      state.addProductFormData = action.payload.addProductFormData;
    },
    showProductDetailComp:(state, action:PayloadAction<{buttonName: string | null, product_id:string}>)=>{
      state.selectedButton = action.payload.buttonName;
      state.product_id =   action.payload.product_id;
    },
    showUpdateProduct:(state, action: PayloadAction<{buttonName:string|null, product_id:string}>)=>{
      state.selectedButton = action.payload.buttonName;
      state.product_id =   action.payload.product_id;
    }
  },
});
export const { setSelectButton, setAddProductFormData, showProductDetailComp, showUpdateProduct } = sidebarSlice.actions;
export default sidebarSlice.reducer;