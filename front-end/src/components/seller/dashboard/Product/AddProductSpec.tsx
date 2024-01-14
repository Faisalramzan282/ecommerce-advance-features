import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RootState } from '@/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import PhysicalProduct from './PhysicalProduct';
import {addProduct} from '@/GlobalRedux/Features/seller-features/addProducts';
import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
interface ProductFormSpec {
  image: File | null ;
  isPhysicalProduct: boolean;
  weight: number;
  weightUnit: string;
  length: number;
  lengthUnit: string;
  width: number;
  widthUnit: string;
  height: number;
  heightUnit: string;
}
const AddProductSpec: React.FC = () => {
  const [productFormSpec, setProductFormSpec] = useState<ProductFormSpec>({
    image: null,
    isPhysicalProduct: false,
    weight: 0.00,
    weightUnit: 'kg',
    length: 0.00,
    lengthUnit: 'cm',
    width: 0.00,
    widthUnit: 'cm',
    height: 0.00,
    heightUnit: 'cm',
  });
  const addProductInfo = useSelector((state:RootState)=>state.btnDashboardSelection.addProductFormData)!;
  const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();
  const handleProductImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setProductFormSpec((prev) => ({ ...prev, image: file }));
  };
  const handlePhysicalProdCheckBox = () => {
    setProductFormSpec((prev) => ({
      ...prev,
      isPhysicalProduct: !prev.isPhysicalProduct,
    }));
  };
  const handleProductInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductFormSpec((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleProductUnitChange = (e: ChangeEvent<HTMLSelectElement>, dimension: string) => {
    const value = e.target.value;
    setProductFormSpec((prev) => ({
      ...prev,
      [`${dimension}Unit`]: value,
    }));
  };
  const addProductClick = (e: FormEvent) => {
    e.preventDefault();
    const physicalProductAttributes = productFormSpec.isPhysicalProduct
    ? {
        length: productFormSpec.length!,
        lengthUnit: productFormSpec.lengthUnit!,
        width: productFormSpec.width!,
        widthUnit: productFormSpec.widthUnit!,
        height: productFormSpec.height!,
        heightUnit: productFormSpec.heightUnit!,
        weight: productFormSpec.weight!,
        weightUnit: productFormSpec.weightUnit!,
      }
    : {};
    const { height, width, length, weight,lengthUnit,widthUnit,heightUnit, weightUnit, ...formWithoutPhysicalAttrs } = productFormSpec;
    const mergeFormData = {
      ...addProductInfo,
      ...formWithoutPhysicalAttrs,
      ...physicalProductAttributes,
      image: formWithoutPhysicalAttrs.image!,
      weight: physicalProductAttributes.weight!,
      weightUnit : physicalProductAttributes.weightUnit!,
      length: physicalProductAttributes.length!,
      lengthUnit: physicalProductAttributes.lengthUnit!,
      width: physicalProductAttributes.width!,
      widthUnit: physicalProductAttributes.widthUnit!,
      height: physicalProductAttributes.height!,
      heightUnit: physicalProductAttributes.heightUnit!,
    };
    // console.log("mergerd data in comp ", mergeFormData);
    dispatch(addProduct(mergeFormData));
};
  return (
    <form className="m-5" encType="multipart/form-data" onSubmit={addProductClick}>
      <div className="m-5">
        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="image">
            Product Image:
          </label>
          <input
            className="p-2 outline-none rounded mb-2 bg-zinc-300"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleProductImage}
            required/>
        </div>
        <div>
          <label className="text-white mb-2">
            <input
              className="p-2 outline-none rounded mb-2 bg-zinc-300 transform scale-150 mr-3"
              type="checkbox"
              name="isPhysicalProduct"
              checked={productFormSpec.isPhysicalProduct}
              onChange={handlePhysicalProdCheckBox}/>
            This is a physical product
          </label>
        </div>
        {productFormSpec.isPhysicalProduct && (
          <PhysicalProduct
            productFormSpec={productFormSpec}
            handleProductInputChange={handleProductInputChange}
            handleProductUnitChange={handleProductUnitChange}/>
        ) }
        <button className="text-white items-end bg-gray-700 my-4 hover:bg-zinc-500 p-4 rounded w-full" type="submit">
          Add Product
        </button>
      </div>
    </form>
  );
};
export default AddProductSpec;