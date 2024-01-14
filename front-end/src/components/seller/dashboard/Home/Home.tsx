import { RootState } from "@/GlobalRedux/store";
import React from "react";
import { useSelector } from "react-redux";
const Home = ()=>{
    const profileData = useSelector((state: RootState) => state.getProfile.data);
    const storeDescription = profileData?.storeDescription || '';   return(
    <div className="transition-transform ease-in-out duration-300 transform translate-x-0 text-white w-3/4 mx-auto">
         <p>{storeDescription}</p>
    </div>
   )
}
export default Home;