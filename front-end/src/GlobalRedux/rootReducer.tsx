import { combineReducers } from '@reduxjs/toolkit';
import userRegistrationReducer from './Features/userRegistration/userRegistration';
import userAuthenticationReducer from './Features/userAuthentication/userAuthentication';
import storeSetup from './Features/storeSetup/storeSetup';
import getProfile from './Features/seller-features/getProfile';
import btnDashboardSelection from './Features/seller-features/btnDashboardSelection';
import addProduct from './Features/seller-features/addProducts';
import getAllProducts from './Features/seller-features/getAllProducts';
import getSpecificProduct  from './Features/seller-features/getSpecificProductDetail';
import deleteProduct from './Features/seller-features/deleteProduct';
import updateProduct from './Features/seller-features/updateProducts';
const rootReducer = combineReducers({
  userRegistration: userRegistrationReducer,
  userAuthentication: userAuthenticationReducer,
  storeSetup:storeSetup,
  getProfile:getProfile,
  btnDashboardSelection:btnDashboardSelection,
  addProduct : addProduct,
  getAllProducts:getAllProducts, 
  getSpecificProduct:getSpecificProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct
});
export default rootReducer;