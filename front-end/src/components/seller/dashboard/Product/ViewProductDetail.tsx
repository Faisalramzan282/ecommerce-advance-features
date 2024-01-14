import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../GlobalRedux/store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { getSpecificProduct } from "@/GlobalRedux/Features/seller-features/getSpecificProductDetail";
import Image from "next/image";
import { startCase } from 'lodash';
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteProduct } from "@/GlobalRedux/Features/seller-features/deleteProduct";
import { setSelectButton } from "@/GlobalRedux/Features/seller-features/btnDashboardSelection";
import {resetDeleteProductStatus} from '../../../../GlobalRedux/Features/seller-features/deleteProduct';
import { showUpdateProduct } from "@/GlobalRedux/Features/seller-features/btnDashboardSelection";
const ViewProductDetail: React.FC = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch: ThunkDispatch<
    RootState,
    unknown,
    Action<string>
  > = useDispatch();
  const product_id = useSelector(
    (state: RootState) => state.btnDashboardSelection.product_id
  );
  const productDetail = useSelector(
    (state: RootState) => state.getSpecificProduct.products
  ) as any;
  let deleteSuccessfull = useSelector((state:RootState)=>state.deleteProduct.status);
  const handleDeleteProduct = (product_id:string)=>{
    dispatch(deleteProduct(product_id));
  }
  const handleUpdateProduct = (product_id:string)=>{
    dispatch(showUpdateProduct({buttonName: 'updateProduct',product_id:product_id}))
  }
  useEffect(() => {
    dispatch(getSpecificProduct(product_id));
  }, [dispatch, product_id]);
  useEffect(() => {
    if (deleteSuccessfull === 200) {
      dispatch(setSelectButton('viewProduct'));   
      dispatch(resetDeleteProductStatus());
    }
  }, [dispatch, deleteSuccessfull]);
  return (
    <div>
  {productDetail && (
    <div className="grid grid-cols-2">
    <div className="p-2">
      <Image
        src={productDetail.productImage}
        alt="product image"
        height={400}
        width={200}
        className="w-full h-96 object-fill rounded"
        />
    </div>
    <div className="text-white p-2">
      <h1 className="text-lg mb-2">Name: {productDetail.productName}</h1>
      <p className="mb-2">Category: {startCase(productDetail.category)}</p>
      <p className="mb-2">Price: {productDetail.price}</p>
      <div className="mb-2">
      {existedValue("Length", productDetail.length)}
      </div>
      <div className="mb-2">
      {existedValue("Width", productDetail.width)}
      </div>
      <div className="mb-2">
      {existedValue("Height", productDetail.height)}
      </div>
      <div className="mb-2">
      {existedValue("Weight", productDetail.weight)}
      </div>
      <div className="mb-2 italic">
       In stock: {productDetail.quantity}
      </div>
      <div className="flex space-x-2">
        <button className="bg-blue-500  text-white px-4 py-3 rounded w-1/2"
        onClick={()=>handleUpdateProduct(productDetail.product_id)}>Update</button>
        <button className="bg-red-500 text-white px-4 py-3 rounded w-1/2"
        onClick={()=>setShowDeleteConfirmation(true)}>Delete</button>
      </div>
    </div>
    <div className="text-white m-2">
    <p>{productDetail.productDescription}</p>
    </div>
  </div>
  )}
  {/* delete confirmation pop up */}
  <div>
    { showDeleteConfirmation && (
      <DeleteConfirmation 
         onClose={()=>setShowDeleteConfirmation(false)}
         onDelete={()=>handleDeleteProduct(productDetail.product_id)}
      />
    )}
  </div>
</div>);
};
const existedValue = (propertyName: string, propertyValue: any) => {
  if (propertyValue !== 0 && propertyValue !== "null") {
    return <p>{`${propertyName}: ${propertyValue}`}</p>;
  }
  return null;
};
export default ViewProductDetail;