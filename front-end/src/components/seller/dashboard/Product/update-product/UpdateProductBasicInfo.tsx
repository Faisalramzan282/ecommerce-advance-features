import React from "react";
interface ProductBasicInfoProps {
    productForm: {
        productName: string;
        productDescription: string;
        category: string;
        price: number;
        quantity: number;
        image: File | null;
      };
    handleChangeEvent: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleProductImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
    productForm,
    handleChangeEvent,
    handleProductImage,
  }) => {    
    return (
        <div >
              <div className="flex flex-col">
        <label className="text-white mb-2" htmlFor="productName">
          Product Name:
        </label>
        <input
          className="p-2 outline-none rounded mb-2 bg-zinc-300"
          type="text"
          id="productName"
          name="productName"
          placeholder="Ex: Smart Thermostat"
          value={productForm.productName}
          onChange={handleChangeEvent}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-white mb-2" htmlFor="productDescription">
          Product Description:
        </label>
        <textarea
          className="p-2 outline-none rounded mb-2 bg-zinc-300"
          placeholder="A programmable thermostat that learns and adapts to your preferences"
          id="productDescription"
          name="productDescription"
          value={productForm.productDescription}
          onChange={handleChangeEvent}
          required
        />
      </div>
      <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="category">Category:</label>
          <select  className="p-2 outline-none rounded mb-2 bg-zinc-300" id="category" name="category" value={productForm.category} onChange={handleChangeEvent}>
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
        <label className="text-white mb-2" htmlFor="price">
          Price (PKR):
        </label>
        <input
          className="p-2 outline-none rounded mb-2 bg-zinc-300"
          type="number"
          id="price"
          name="price"
          value={productForm.price}
          onChange={handleChangeEvent}
          step="0.01"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-white mb-2" htmlFor="quantity">
          Quantity:
        </label>
        <input
          className="p-2 outline-none rounded mb-2 bg-zinc-300"
          type="number"
          id="quantity"
          name="quantity"
          value={productForm.quantity}
          onChange={handleChangeEvent}
          required
        />
      </div>
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
          required
        />
      </div>
        </div>
    )
}
export default ProductBasicInfo;