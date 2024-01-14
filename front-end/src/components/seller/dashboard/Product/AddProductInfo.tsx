import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddProductFormData } from "@/GlobalRedux/Features/seller-features/btnDashboardSelection";
interface ProductFormState {
  productName: string;
  productDescription: string;
  category: string;
  price: number;
  quantity: number;
}
const initialFormState: ProductFormState = {
  productName: '',
  productDescription: '',
  category: 'electronics',
  price: 0,
  quantity: 0
};
const AddProductInfo = () => {
  const [productFormState, setProductFormState] = useState<ProductFormState>(initialFormState);
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedValue = e.target.tagName === 'SELECT' ? (e.target as HTMLSelectElement).value : value;
    setProductFormState((prev) => ({ ...prev, [name]: selectedValue }));
  };
  
  const dispatch = useDispatch();
  const productFormStateSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    console.log("form submitted", productFormState);
    dispatch(setAddProductFormData({ buttonName: "saveAndContinue", addProductFormData: productFormState }));
  }
  return (
    <div >
      <form className="m-5" onSubmit={productFormStateSubmit}>
        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="productName">Product Name:</label>
          <input
            className="p-2 outline-none rounded mb-2 bg-zinc-300"
            type="text"
            id="productName"
            name="productName"
            placeholder="Ex: Smart Thermostat"
            value={productFormState.productName}
            onChange={handleChangeEvent}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="productDescription">Product Description:</label>
          <textarea
            className="p-2 outline-none rounded mb-2 bg-zinc-300"
            placeholder="A programmable thermostat that learns and adapts to your preferences"
            id="productDescription"
            name="productDescription"
            value={productFormState.productDescription}
            onChange={handleChangeEvent}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="category">Category:</label>
          <select  className="p-2 outline-none rounded mb-2 bg-zinc-300" id="category" name="category" value={productFormState.category} onChange={handleChangeEvent}>
            <option value="electronics">Electronics</option>
            <option value="apparelAndFashion">Apparel and Fashion</option>
            <option value="homeAndLiving">Home and Living</option>
            <option value="beautyAndPersonalCare">Beauty and Personal Care</option>
            <option value="booksAndMedia">Books and Media</option>
            <option value="healthAndWellness">Health and Wellness</option>
            <option value="sportsAndOutdoors">Sports and Outdoors</option>
            <option value="toysAndGames">Toys and Games</option>
            <option value="foodAndBeverages">Food and Beverages</option>
            <option value="craftAndHobbies">Craft and Hobbies</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="price">Price (PKR):</label>
          <input
            className="p-2 outline-none rounded mb-2 bg-zinc-300"
            type="number"
            id="price"
            name="price"
            value={productFormState.price}
            onChange={handleChangeEvent}
            step="0.01"
            required
          />
        </div>
        <div  className="flex flex-col">
          <label className="text-white mb-2" htmlFor="quantity">Quantity:</label>
          <input
            className="p-2 outline-none rounded mb-2 bg-zinc-300"
            type="number"
            id="quantity"
            name="quantity"
            value={productFormState.quantity}
            onChange={handleChangeEvent}
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                productFormStateSubmit(e);
              }
            }}
          />
        </div>
       <div className="flex justify-end">
          <button className="text-white items-end bg-gray-700 my-4 hover:bg-zinc-500 p-4 rounded" type="submit">Save and Continue</button>
      </div>
      </form>
    </div>
  );
};
export default AddProductInfo;