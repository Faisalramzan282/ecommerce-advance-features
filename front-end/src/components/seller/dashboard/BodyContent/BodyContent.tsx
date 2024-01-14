import { RootState } from "@/GlobalRedux/store";
import React from "react";
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic';
import ViewProductDetail from "../Product/ViewProductDetail";
const SideBar = dynamic(() => import("../SideBar/SideBar"), { ssr: false });
const Home = dynamic(()=>import("../Home/Home"));
const AddProductInfo = dynamic(() => import("../Product/AddProductInfo"));
const AddProductSpec = dynamic(()=>import("../Product/AddProductSpec"));
const ViewProduct = dynamic(() => import("../Product/ViewProduct"));
const viewProductDetail = dynamic(()=>import("../Product/ViewProductDetail"));
const UpdateProduct = dynamic(()=>import("../Product/update-product/UpdateProduct"));
const Order = dynamic(()=>import("../Order/Order"));
const Notification = dynamic(()=>import("../Notification/Notification"));
const Setting = dynamic(()=>import("../Setting/Setting"));
const Logout = dynamic(()=>import("../Logout/Logout"));
const BodyContent: React.FC = () => {
  const selectedButton = useSelector((state:RootState)=>state.btnDashboardSelection.selectedButton) || "homeComp";
  const selectedBtnFormData = useSelector((state:RootState)=>state.btnDashboardSelection);
    return(
      <div>
        {selectedButton === 'homeComp' && <Home />}
        {selectedButton === 'addProduct' && <AddProductInfo /> }
        {selectedBtnFormData.selectedButton === "saveAndContinue" && <AddProductSpec/>}
        {selectedButton === 'updateProduct' && <UpdateProduct/>}
        {selectedButton === 'viewProduct' && <ViewProduct />}
        {selectedButton === 'showProductDetail' && <ViewProductDetail/>}
        {selectedButton === 'orderComp' && <Order />}
        {selectedButton === 'notificationComp' && <Notification />}
        {selectedButton === 'logoutComp' && <Logout />}
        {selectedButton === 'settingComp' && <Setting />}
      </div>
    );
};
export default BodyContent;