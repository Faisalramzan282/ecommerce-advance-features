import React from 'react';
interface PhysicalProductProps {
  productFormSpec: {
    weight: number;
    weightUnit: string;
    length: number;
    lengthUnit: string;
    width: number;
    widthUnit: string;
    height: number;
    heightUnit: string;
  };
  handleProductInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProductUnitChange: (e: React.ChangeEvent<HTMLSelectElement>, dimension: string) => void;
}
const PhysicalProduct: React.FC<PhysicalProductProps> = ({
  productFormSpec,
  handleProductInputChange,
  handleProductUnitChange,
}) => {  
  return (
  <div>
  <div className="flex flex-col">
        <label className="text-white mb-2" htmlFor="weight">
          Weight:
        </label>
        <input
          type="number"
          step={0.01}
          id="weight"
          name="weight"
          className="p-2 outline-none rounded mb-2 bg-zinc-300"
          value={productFormSpec.weight}
          required
          onChange={handleProductInputChange} />
        <select
value={productFormSpec.weightUnit !== undefined ? productFormSpec.weightUnit : 'kg'}
onChange={(e) => handleProductUnitChange(e, 'weight')}
          className="p-2 outline-none rounded mb-2 bg-zinc-300" >
          <option value="kg">kg</option>
          <option  value="g">g</option>
          <option  value="lbs">lbs</option>
        </select>
      </div>
      <div className="flex flex-col">
   <label className="text-white mb-2" htmlFor="length">
       Length:
      </label>
     <input
         type="number"
         step={0.01}
        id="length"
         name="length"
         className="p-2 outline-none rounded mb-2 bg-zinc-300"
         value={productFormSpec.length}
         required
         onChange={handleProductInputChange}
       />
       <select
         value={productFormSpec.lengthUnit}
         onChange={(e) => handleProductUnitChange(e, 'length')}
         className="p-2 outline-none rounded mb-2 bg-zinc-300"
       >
         <option value="cm">cm</option>
         <option value="m">m</option>
         <option value="in">in</option>
       </select>
     </div>
     <div className="flex flex-col">
       <label className="text-white mb-2" htmlFor="width">
         Width:
       </label>
       <input
         type="number"
         step={0.01}
         id="width"
         name="width"
         required
         className="p-2 outline-none rounded mb-2 bg-zinc-300"
       value={productFormSpec.width}
        onChange={handleProductInputChange}
       />
       <select
         value={productFormSpec.widthUnit}
         onChange={(e) => handleProductUnitChange(e, 'width')}
         className="p-2 outline-none rounded mb-2 bg-zinc-300"
       >
         <option value="cm">cm</option>
         <option value="m">m</option>
         <option value="in">in</option>
       </select>
     </div>
     <div className="flex flex-col">
       <label className="text-white mb-2" htmlFor="height">
         Height:
       </label>
       <input
         type="number"
         step={0.01}
         id="height"
         name="height"
         className="p-2 outline-none rounded mb-2 bg-zinc-300"
         value={productFormSpec.height}
         required
         onChange={handleProductInputChange}
       />
       <select
         value={productFormSpec.heightUnit}
         onChange={(e) => handleProductUnitChange(e, 'height')}
         className="p-2 outline-none rounded mb-2 bg-zinc-300">
         <option value="cm">cm</option>
         <option value="m">m</option>
         <option value="in">in</option>
       </select>
     </div>
   </div>
  );
};
export default PhysicalProduct;