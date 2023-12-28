import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSignInAlt,faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {useRouter} from 'next/router';
import {userAuth} from '../GlobalRedux/Features/userAuthentication/userAuthentication';
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../GlobalRedux/store';
import { Action } from '@reduxjs/toolkit';
import {resetAuthError} from '../GlobalRedux/Features/userAuthentication/userAuthentication';
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seller, setSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [displayedErrors, setDisplayedErrors] = useState<string[]>([]);
  const router = useRouter();
  const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch(); 
  const {  authError } = useSelector((state: RootState) => state.userAuthentication);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLogin = () => {
    dispatch(userAuth({email,password,seller}))
  };
  const handleChangeRole = () => {
    setSeller(!seller);
  };
  const handleCreateAccountPage=()=>{
    router.push('/signup');
  }
  const togglePasswordVisibility=()=>{
    setShowPassword((prevShowPassword)=>!prevShowPassword);
  }
//shows only five seconds error
useEffect(() => {
  setDisplayedErrors(authError);
  const timeoutId = setTimeout(() => {
      setDisplayedErrors([]);
      dispatch(resetAuthError());
    }, 5000);
  return () => clearTimeout(timeoutId);
}, [authError, dispatch]);  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md border-t-2">
        <p className="text-2xl font-bold mb-4">Login Ecommerce</p>
        <div className="mt-4 mb-4 ">
          <button className="text-center bg-white w-full border border-gray-300 text-gray-700 py-3 rounded-3xl hover:bg-gray-100 transform transition-transform hover:scale-90">
            <FontAwesomeIcon
              icon={faGoogle}
              className="mr-2 text-blue-600 transform transition-transform hover:rotate-180"
            />
            Login with Google
          </button>
        </div>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-2 text-gray-400">
            Or login With Email
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        {/* erros */}
        <div>
          {displayedErrors && displayedErrors.map((error, index) => (
          <p key={index}>{error}</p>
          ))}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            type="email"
            value={email}
            onChange={handleEmailChange}/>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
            type={showPassword ? 'text' : 'password'}            
            value={password}
            onChange={handlePasswordChange}/>
          <FontAwesomeIcon
             icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform translate-y-1/2 text-gray-500 cursor-pointer"/>
        </div>
        <div className="mb-4 relative flex items-center">
          <label className="flex-shrink-0">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-500"
              checked={seller}
              onChange={handleChangeRole}/>
          </label>
          <span className="ml-2 text-gray-700">Seller</span>
        </div>
        <button
          className="mt-4 mb-2 bg-blue-500 border border-blue-700 text-white px-4 py-3 rounded-3xl hover:bg-blue-600 w-full transform transition-transform hover:scale-90 w-full"
          onClick={handleLogin}>
          <FontAwesomeIcon
            icon={faSignInAlt}
            className="mr-2 transform transition-transform hover:translate-x-w hover:scale-90"
            style={{ transform: "translate(-w/2) scale(0.9)" }}/>
          Login
        </button>
        <div className="m-2">
          <p className="text-center">
            Do not have an account?
            <span onClick={handleCreateAccountPage} className="cursor-pointer text-blue-900">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;