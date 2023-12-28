import { combineReducers } from '@reduxjs/toolkit';
import userRegistrationReducer from './Features/userRegistration/userRegistration';
import userAuthenticationReducer from './Features/userAuthentication/userAuthentication';
const rootReducer = combineReducers({
  userRegistration: userRegistrationReducer,
  userAuthentication: userAuthenticationReducer
});

export default rootReducer;
