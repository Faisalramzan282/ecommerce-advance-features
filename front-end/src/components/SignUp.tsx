import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../GlobalRedux/store';
import { Action } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import userRegistration, { registerUser, resetStatus } from '../GlobalRedux/Features/userRegistration/userRegistration';
import { resetError } from '../GlobalRedux/Features/userRegistration/userRegistration';
const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayedErrors, setDisplayedErrors] = useState<string[]>([]);
    const router = useRouter();
    const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch(); 
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleUsernameChnage = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(event.target.value);
    }
    const {  errors } = useSelector((state: RootState) => state.userRegistration);
    let status = useSelector((state:RootState)=>state.userRegistration.status);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    //shows only five seconds error
    useEffect(() => {
        setDisplayedErrors(errors);
        const timeoutId = setTimeout(() => {
            setDisplayedErrors([]);
            dispatch(resetError());
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [errors, dispatch]);
    useEffect(()=>{
      if(status === 200){
        router.push('/login');
        dispatch(resetStatus('0'));
    }
    }, [status, router, dispatch]);
    const signUpBtn = () => {
        dispatch(registerUser({ email, password, username }));
    };
    const handleLoginClick = ()=>{
        router.push('/login')
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-4 bg-white shadow-md rounded-md border-t-2">
                <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
                <div>
                    {displayedErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
                        type="text"
                        value={username}
                        onChange={handleUsernameChnage}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <FontAwesomeIcon
                        icon={faLockOpen}
                        className="absolute top-1/2 right-3 transform translate-y-1/2 text-gray-500"
                    />
                </div>
                <button
                    className="mt-4 mb-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                    onClick={signUpBtn}>
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Create Account
                </button>
                <div className='p-4 text-center'>
                    <p>By Selecting Ceate account, you agree to our <span className='text-blue-400 cursor-pointer'>terms</span> and have read and acknowledge our <span className='text-blue-400 cursor-pointer'>Global Privacy statement</span> </p>
                    <p>Already have account?<span className='text-blue-400 cursor-pointer' onClick={handleLoginClick}>login</span></p>
                </div>
            </div>
        </div>
    );
};
export default SignUp;