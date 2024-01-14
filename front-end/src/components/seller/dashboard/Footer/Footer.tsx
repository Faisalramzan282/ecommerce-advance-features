import React from "react";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
    return (
        <div className=" text-white m-8">
            <div className="border border-gray-400 mb-4"></div>
            <div className="container mx-auto flex flex-wrap">
                <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="list-none space-y-3">
                        <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                        <li><a href="#" className="hover:text-gray-300">Terms & Conditions</a></li>
                        <li className="mb-2"><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-4">Seller Support</h3>
                    <ul className="list-none space-y-3">
                        <li><a href="#" className="hover:text-gray-300">Seller Dashboard</a></li>
                        <li><a href="#" className="hover:text-gray-300">How to Sell</a></li>
                        <li className="mb-2"><a href="#" className="hover:text-gray-300">Seller FAQ</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3">
                    <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-xl hover:text-gray-300">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="#" className="text-xl hover:text-gray-300">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="#" className="text-xl hover:text-gray-300">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#" className="text-xl hover:text-gray-300">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-center">
                <p>&copy; 2024 Ecommerce Tech Giant! All rights reserved.</p>
            </div>
        </div>
    )
}
export default Footer;