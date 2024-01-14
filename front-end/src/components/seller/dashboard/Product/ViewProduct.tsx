import React, { useEffect } from "react";
import { allProducts } from "@/GlobalRedux/Features/seller-features/getAllProducts";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../GlobalRedux/store";
import { Action } from "@reduxjs/toolkit";
import Image from "next/image";
import { Tooltip, TooltipProps } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { showProductDetailComp } from '../../../../GlobalRedux/Features/seller-features/btnDashboardSelection';
const ViewProduct: React.FC = () => {
  const dispatch: ThunkDispatch<
    RootState,
    unknown,
    Action<string>
  > = useDispatch();
  const getAllProducts = useSelector(
    (state: RootState) => state.getAllProducts.products);
  useEffect(() => {
    console.log("in view component");
    dispatch(allProducts());
  }, [dispatch]);
  const handleProductClick = (productId: string) => {
    dispatch(showProductDetailComp({ buttonName: "showProductDetail", product_id: productId }));
  }
  return (
    <div className="m-5 grid xs:grid-cols-1 ss:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {getAllProducts &&
        getAllProducts.map((product) => (
          <div
            key={product.product_id}
            onClick={() => handleProductClick(product.product_id)}
            className="w-full border border-gray-500 hover:border-gray-200 hover:shadow-lg hover:scale-105 cursor-pointer rounded-sm">
            <div className="image-container rounded-sm">
              <Image
                src={product.productImage}
                alt={product.productName}
                width={500}
                height={500}
                data-tip={product.productName}
                className="object-fill w-full h-52" />
            </div>
            <div className="bg-sellerDashboardBody p-2 text-start text-white">
              {/* <Tooltip
                content={<p>product.productName</p>}
                position="bottom"
                trigger="mouseenter"
                arrow={true}
                animation="fade"
              > */}
                <p className="font-bold overflow-hidden whitespace-nowrap overflow-ellipsis text-lg mb-2">{product.productName}</p>
              {/* </Tooltip> */}
              <p className="italic mt-2">Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ViewProduct;