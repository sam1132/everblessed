import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminOverview from '../pages/AdminOverview';
import DonorList from '../pages/DonorList';
import NGOList from '../pages/NGOList';
import { FaChartPie } from "react-icons/fa";
import { AiOutlineTeam,AiOutlineFileText } from "react-icons/ai";
import { FaBuildingNgo } from "react-icons/fa6";
const AdminNavbar = () => {
  return (
    
    <div className='mr-4 '>
      
        {/* Sidebar / Navigation Bar */}
        <div className="w-[22rem] md:w-full   md:h-screen rounded-md bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <ul>
            <li className="mb-4 flex items-center">
            <div className='lg:text-[24px] mr-2 text-lg'> <FaChartPie/> </div>
              <Link to="/admin/overview" className="hover:text-blue-400 text-xl lg:text-2xl font-semibold hover:underline transition-all duration-700">
              Overview</Link>
            </li>
            <li className="mb-4 flex items-center">
              <div className='lg:text-[24px] mr-2 text-lg'><AiOutlineTeam/> </div>
              <Link to="/admin/donors" className="hover:text-blue-400 text-xl lg:text-2xl font-semibold hover:underline transition-all duration-700">Donors</Link>
            </li>
            <li className="mb-4 flex items-center">
              <div className=' lg:text-[24px] mr-2 text-lg'><FaBuildingNgo/></div>
              <Link to="/admin/ngos" className="hover:text-blue-400 text-xl lg:text-2xl font-semibold hover:underline transition-all duration-700"> NGOs</Link>
            </li>
            <li className="mb-4 flex items-center">
              <div className='lg:text-[24px] mr-2 text-lg'><AiOutlineFileText /></div>
              <Link to="/admin/report" className="hover:text-blue-400 text-xl lg:text-2xl font-semibold hover:underline transition-all duration-700"> Reports</Link>
            </li>
          </ul>
        </div>
      
      </div>
  );
};

export default AdminNavbar;
