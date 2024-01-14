import React, {useState} from "react";
import { faBars, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBar = ()=>{
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };
   return(
    <div className="m-5 h-12 flex flex-row items-center">
        <div className="flex flex-row">
        <FontAwesomeIcon icon={faBars} className="w-8 h-6 mr-2 cursor-pointer" />
        <p>Home</p>
        </div>
        <div className={`flex-grow h-12 mx-5 transition-all duration-300 transform ${isSearchOpen ? 'scale-x-100' : 'scale-x-0'}`}>
        {isSearchOpen && (
        <div className="flex">
          <input type="text" placeholder="Search..." className="p-2 m-1 focus:outline-none rounded border border-gray-300 bg-gray-200 text-black  flex-grow" />
        </div>
      )}
        </div>
        <div className="ml-auto">
           <FontAwesomeIcon icon={faSearch} 
            onClick={handleSearchToggle}
           className="w-8 h-6 mr-2 cursor-pointer transition duration-300 ease-in-out text-gray-500 hover:text-white hover:shadow-lg" />
           <FontAwesomeIcon icon={faBell} className="w-8 h-6 mr-2 cursor-pointer transition duration-300 ease-in-out text-gray-500 hover:text-white hover:shadow-lg" />
        </div>
        
    </div>
   )
}
export default NavBar;