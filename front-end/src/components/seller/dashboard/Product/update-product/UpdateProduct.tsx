import React, { useState, useEffect } from 'react'; 
import PhysicalProduct from '../PhysicalProduct';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';
import { getSpecificProduct } from '@/GlobalRedux/Features/seller-features/getSpecificProductDetail';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import ProductBasicInfo from './UpdateProductBasicInfo';
import {updateProduct} from "@/GlobalRedux/Features/seller-features/updateProducts";
import { setSelectButton } from '@/GlobalRedux/Features/seller-features/btnDashboardSelection';
import { updateProductStatus } from '@/GlobalRedux/Features/seller-features/updateProducts';
interface productForm {
  product_id:number,
  productName: string,
  productDescription: string,
  category: string,
  price: number,
  quantity: number,
  image: File | null ,
  isPhysicalProduct: boolean,
  weight: number,
  weightUnit: string ,
  length: number,
  lengthUnit: string,
  width: number,
  widthUnit: string,
  height: number,
  heightUnit: string,
}
const UpdateProduct: React.FC = () => {
  const [productForm, setProductForm] = useState<productForm>({
    product_id:0,
    productName:  '',
    productDescription: '',
    category: '',
    price: 0.0,
    quantity: 0,
    image: null ,
    isPhysicalProduct: false,
    weight: 0.0,
    weightUnit: 'kg',
    length: 0.0,
    lengthUnit: 'cm',
    width: 0.0,
    widthUnit: 'cm',
    height: 0.0,
    heightUnit: 'cm',
  });
  const product_id = useSelector((state:RootState)=>state.btnDashboardSelection.product_id);
  const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch();
  let updateSuccessfull = useSelector((state:RootState)=>state.updateProduct.status);
  useEffect(() => {
    if (updateSuccessfull === 200) {
      dispatch(setSelectButton('viewProduct'));   
      dispatch(updateProductStatus());
    }
  }, [dispatch, updateSuccessfull]);
useEffect(()=>{
   dispatch(getSpecificProduct(product_id))
  },[dispatch, product_id]);
  const initialProductForm = useSelector((state:RootState)=>state.getSpecificProduct.products)
  useEffect(() => {
    if (initialProductForm) {
      console.log('Initial Product Form:', initialProductForm);
      setProductForm(mapToProductForm(initialProductForm));
    }
  }, [initialProductForm]);
  const mapToProductForm = (initialProductForm: any): productForm => {
    const parseDimension = (dimensionString: string) => {
      const matches = dimensionString.match(/^(\d+(\.\d+)?)\s*([a-zA-Z]+)$/);
      if (matches) {
        const numericValue = parseFloat(matches[1]);
        const unit = matches[3];
        return { numericValue, unit };
      }
      return { numericValue: 0, unit: '' };
    };
    const parseWeight = (weightString: string) => {
      const { numericValue, unit } = parseDimension(weightString);
      console.log("in weight ", numericValue , "in unit", unit);
      return { weight: numericValue, weightUnit: unit };
    };
    const parseHeight = (heightString:string) =>{
      const {numericValue, unit} = parseDimension(heightString);
      console.log("in height", numericValue , "in unit", unit);
      return {height: numericValue, heightUnit:unit}
    }
    const parseWidth = (widthString:string)=>{
      const {numericValue, unit } = parseDimension(widthString);
      console.log("in width ", numericValue , "in unit", unit );
      return {width: numericValue, widthUnit: unit};
    }
    const parseLength = (lengthString: string)=>{
    const {numericValue, unit} = parseDimension(lengthString);
    console.log("in length ", numericValue , "in unit", unit );
    return { length: numericValue, lengthUnit: unit};
    }
    return {
      product_id:initialProductForm.product_id,
      productName: initialProductForm.productName || '',
      productDescription: initialProductForm.productDescription || '',
      category: initialProductForm.category || '',
      price: initialProductForm.price || 0.0,
      quantity: initialProductForm.quantity || 0,
      image: initialProductForm.image || null,
      isPhysicalProduct: initialProductForm.isPhysicalProduct || false,
      ...parseWeight(initialProductForm.weight),
      ...parseWidth(initialProductForm.width),
      ...parseHeight(initialProductForm.height),
      ...parseLength(initialProductForm.length),
      weightUnit : 'kg',
      lengthUnit :  'cm',
      widthUnit : 'cm',
      heightUnit: 'cm'
    };
  };
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedValue = e.target.tagName === 'SELECT' ? (e.target as HTMLSelectElement).value : value;
    setProductForm((prev) => ({ ...prev, [name]: selectedValue }));
  };
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleProductUnitChange = (e: React.ChangeEvent<HTMLSelectElement>, dimension: string) => {
    const value = e.target.value;
    console.log(`Handling ${dimension} unit change. New value:`, value);
    setProductForm((prev) => ({
      ...prev,
      [`${dimension}Unit`]: value
    }));
  };
  const handlePhysicalProdCheckBox = () => {
    setProductForm((prev) => ({
      ...prev,
      isPhysicalProduct: !prev.isPhysicalProduct,
    }));
  };
  const handleProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setProductForm((prev) => ({ ...prev, image: file }));
  };
  const handleUpdateProduct = (e: any) => {
    e.preventDefault();
    console.log('complete form in component is ', productForm);
    dispatch(updateProduct(productForm));
  };
   return (
    <div>
    <form encType="multipart/form-data" className="m-5" onSubmit={handleUpdateProduct}>
       <ProductBasicInfo 
        productForm={{
          productName: productForm.productName,
          productDescription: productForm.productDescription,
          category: productForm.category,
          price: productForm.price,
          quantity: productForm.quantity,
          image: productForm.image,
        }}
        handleChangeEvent={handleChangeEvent}
        handleProductImage={handleProductImage}
       />
      <label className="text-white mb-2">
        <input
          className="p-2 outline-none rounded mb-2 bg-zinc-300 transform scale-150 mr-3"
          type="checkbox"
          name="isPhysicalProduct"
          checked={productForm.isPhysicalProduct}
          onChange={handlePhysicalProdCheckBox}
        />
        This is a physical product
      </label>
      {productForm.isPhysicalProduct && (
        <PhysicalProduct
          productFormSpec={{
            weight: productForm.weight,
            weightUnit: productForm.weightUnit,
            length: productForm.length,
            lengthUnit: productForm.lengthUnit,
            width: productForm.width,
            widthUnit: productForm.widthUnit,
            height: productForm.height,
            heightUnit: productForm.heightUnit,
          }}
          handleProductInputChange={handleProductInputChange} 
          handleProductUnitChange={handleProductUnitChange}
        />
      )}
      <button className="text-white items-end bg-gray-700 my-4 hover:bg-zinc-500 p-4 rounded w-full" type="submit">
        Update Product
      </button>
    </form>
  </div>
  )
}
export default UpdateProduct;