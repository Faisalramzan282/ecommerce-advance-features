// import React,{useEffect} from "react";


// interface PaymentInfoProps {
//   storeName: string;
//   storeDescription: string;
//   address: string;
//   contact: string;
//   logo: File | null;
// }
// const PaymentInfo: React.FC<PaymentInfoProps> = (props) => {
//   const {storeName, storeDescription, address, contact, logo} = props;
  
//     const storeSetUpBtn = () => {
//       dispatch(storeSetup({storeName, storeDescription, address, contact, logo}));
//     };
//     return (
//         <div className="mx-auto p-6 bg-white shadow-md rounded-md max-w-full md:max-w-lg lg:max-w-3xl xl:max-w-4xl">
//         <button
//          type="button"
//          className="mb-4 w-full p-3  bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transform">
//          Link Bank Account
//        </button>
//        <button
//          onClick={storeSetUpBtn}
//          type="submit"
//          className="px-6 py-3 w-full bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transform">
//          Submit
//     </button>
//     </div>
//     );
// }
// export default PaymentInfo;