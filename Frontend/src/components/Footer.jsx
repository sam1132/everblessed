import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram,FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-6">
      <div className="max-w-[95rem] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0">
            <h2 className=" text-2xl md:text-4xl font-bold">Our Mission</h2>
            <p className="mt-2 md:text-xl text-gray-300">
              We aim to create a better world by providing essential services to those in need.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to='/aboutus' className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to='/ngo/allngos' className="text-gray-400 hover:text-white">Donate</Link>
              </li>
              <li>
                <Link to='/services' className="text-gray-400 hover:text-white">Our Services</Link>
              </li>
              <li>
                <Link to='/contactus' className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4 cursor-pointer">
            <a  className="text-gray-400 hover:text-pink-600 transition-colors duration-300 ease-in-out">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 ease-in-out">
             <FaFacebook className="h-6 w-6" />
            </a>
            <a  className="text-gray-400 hover:text-black transition-colors duration-300 ease-in-out">
                <FaXTwitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500">
          <p>&copy; 2024 EverBlessed. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
