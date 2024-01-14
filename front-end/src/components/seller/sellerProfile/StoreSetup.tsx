import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../GlobalRedux/store';
import { Action } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import {storeSetup} from "@/GlobalRedux/Features/storeSetup/storeSetup";
const StoreSetup: React.FC = () => {
const [storeName, setStoreName] = useState('');
const [storeDescription, setStoreDescription] = useState('');
const [address, setAddress] = useState('');
const [contact, setContact] = useState('');
const [logo, setLogo] = useState<File | null>(null);
const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();
  // const {fulfilled } = useSelector((state:RootState)=>state.storeSetup);
  const storeSetupInfo = () => {
    setStoreName(localStorage.getItem('storeName') || '');
    setStoreDescription(localStorage.getItem('storeDescription') || '');
    setAddress(localStorage.getItem('address') || '');
    setContact(localStorage.getItem('contact') || '');
  };
  const handleSubmit =async  (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("storeName", storeName);
    localStorage.setItem("storeDescription", storeDescription);
    localStorage.setItem("address", address);
    localStorage.setItem("contact", contact);
      const formData = new FormData();
      formData.append('storeName', storeName);
      formData.append('storeDescription', storeDescription);
      formData.append('address', address);
      formData.append('contact', contact);
      if (logo) {
        formData.append('logo', logo);
      }
      const seller_id = localStorage.getItem('seller_id');
      dispatch(storeSetup({formData, seller_id: seller_id || ''}));
  };
  useEffect(() => {
    storeSetupInfo();
  }, []);
  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-md max-w-full md:max-w-lg lg:max-w-3xl xl:max-w-4xl">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Store Setup</h2>
    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="space-y-4">
      <div className="mb-4">
        <label htmlFor="storeName" className="block text-sm font-medium text-gray-600">
          Store Name:
        </label>
        <input
          type="text"
          id="storeName"
          name="storeName"
          value={storeName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStoreName(e.target.value)}
          className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 duration-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-600">
          Store Description:
        </label>
        <textarea
          id="storeDescription"
          name="storeDescription"
          value={storeDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setStoreDescription(e.target.value)}
          rows={3}
          className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-300"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-600">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
          Contact:
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={contact}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContact(e.target.value)}
          className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="logo" className="block text-sm font-medium text-gray-600">
          Store Profile:
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLogo(e.target.files?.[0] || null)}
          className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
      </div>
      <div className="flex m-3">
        <button className="bg-black p-3 text-white rounded-xl ml-auto">Save and Continue</button>
      </div>
    </form>
  </div>
  );
};
export default StoreSetup;