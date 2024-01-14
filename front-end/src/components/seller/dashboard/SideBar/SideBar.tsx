import React, { useEffect, useState } from "react";
import { getProfile } from "@/GlobalRedux/Features/seller-features/getProfile";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../../GlobalRedux/store';
import { Action } from '@reduxjs/toolkit';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faClipboard, faBell, faCog, faSignOutAlt,faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { setSelectButton } from "@/GlobalRedux/Features/seller-features/btnDashboardSelection";
const SideBar: React.FC = () => {  
  const [showProductButtons, setShowProductButtons] = useState(false);
  const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();
  const profileData = useSelector((state: RootState) => state.getProfile.data)!;
  useEffect(() => {
    const seller_id = localStorage.getItem('seller_id') as string;
    dispatch(getProfile(seller_id));
  }, [dispatch])
  const handleButtonClick = (buttonName:string)=>{
    dispatch(setSelectButton(buttonName));
  }
  return (
    <div className="text-white">
      <div className="flex flex-row m-4">
        <Image
          src={profileData?.profileUrl}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full cursor-pointer"/>
        <div className="flex items-center justify-center flex-1">
          <h1 >{profileData?.storeName}</h1>
        </div>
      </div>
      <div className="flex flex-col items-start m-4">
         <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-3"
         onClick={()=>handleButtonClick('homeComp')}>
         <FontAwesomeIcon icon={faHome} className="mr-2 ml-2" /> Home</button>
         <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-3"
          onClick={() => {
            setShowProductButtons(!showProductButtons);
          }}>
         <FontAwesomeIcon icon={faShoppingCart} className="mr-2 ml-2" /> Product</button>
          {showProductButtons && (
     <div className="ml-5">
       <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-2"
         onClick={() => handleButtonClick('addProduct')}>
         <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Product
       </button>
       <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-2"
        onClick={() => handleButtonClick('viewProduct')}>
         <FontAwesomeIcon icon={faEye} className="mr-2" /> View Product
       </button>
   </div>
      )}
         <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-3"
         onClick={() => handleButtonClick('orderComp')}>
         <FontAwesomeIcon icon={faClipboard} className="mr-2 ml-2" />Order</button>
         <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-3"
         onClick={()=>handleButtonClick("notificationComp")}>
         <FontAwesomeIcon icon={faBell} className="mr-2 ml-2" />Notification</button>
         <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-3"
         onClick={()=>handleButtonClick('settingComp')}>
         <FontAwesomeIcon icon={faCog} className="mr-2 ml-2" />Setting</button>
         <button className="hover:border hover:border-white py-2 rounded text-left w-full mt-3"
         onClick={()=>handleButtonClick('logoutComp')}>
         <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 ml-2" />Logout</button>
      </div>
    </div>
  )
}
export default SideBar;