import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import PaymentInfo from './PaymentInfo';
const StoreSetup: React.FC = () => {
  // const storedStoreName = localStorage ? localStorage.getItem('storeName') : null;
const [storeName, setStoreName] = useState('');
const [storeDescription, setStoreDescription] = useState('');
const [address, setAddress] = useState('');
const [contact, setContact] = useState('');
const [logo, setLogo] = useState<File | null>(null);
const [storeInfo, setStoreInfo] = useState(true);
const [paymentInfo, setPaymentInfo] = useState(false);
  const handleSectionChange = (section: string) => {
    if (section === 'storeInfo') {
      setStoreInfo(true);
      setPaymentInfo(false);
    }
  };
  const storeSetupInfo = () => {
    setStoreName(localStorage.getItem('storeName') || '');
    setStoreDescription(localStorage.getItem('storeDescription') || '');
    setAddress(localStorage.getItem('address') || '');
    setContact(localStorage.getItem('contact') || '');
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPaymentInfo(true);
    setStoreInfo(false);
    localStorage.setItem("storeName", storeName);
    localStorage.setItem("storeDescription", storeDescription);
    localStorage.setItem("address", address);
    localStorage.setItem("contact", contact);
  };
  useEffect(() => {
    storeSetupInfo();
  }, []);
  return (
  <div>
    <div className="grid grid-cols-6 m-3 mt-5">
  <div className="flex items-center flex-col col-span-2">
    <div className="flex items-center">
      <input type="radio" className="form-radio h-5 w-5 text-blue-500" 
      onChange={() => handleSectionChange('storeInfo')}
      checked={storeInfo}
      />
    </div>
    <span className="mt-2 text-gray-600">Store Information</span>
  </div>
  <div className=" col-span-2">
    <hr className='w-full'/>
  </div>
  <div className="flex items-center flex-col col-span-2">
    <input
      type="radio"
      checked = {paymentInfo}
      onChange={()=>handleSectionChange('paymentInfo')}
      className="form-radio h-5 w-5 text-blue-500"/>
    <span className="mt-2 text-gray-600">Billing</span>
  </div>
   </div>
     {/* store info */}
     {storeInfo &&
      <div className="mx-auto p-6 bg-white shadow-md rounded-md max-w-full md:max-w-lg lg:max-w-3xl xl:max-w-4xl">
       <h2 className="text-3xl font-bold mb-6 text-blue-600">Store Setup</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
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
             className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-300"/>
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
           className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-300"/>
       </div>
       <div className='flex m-3'>
       <button  className="bg-black p-3 text-white rounded-xl ml-auto">Save and Continue</button>
       </div>
        </form>
     </div> }
      {/* paymentInfo */}
     {paymentInfo && 
       <PaymentInfo/>
     }
  </div> 
  );
};
export default StoreSetup;