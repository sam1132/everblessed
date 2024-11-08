import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminOverview from '../pages/AdminOverview';
import DonorList from '../pages/DonorList';
import NGOList from '../pages/NGOList';

const AdminNavbar = () => {
  return (
    
    <div>
      
        {/* Sidebar / Navigation Bar */}
        <div className="w-full h-full bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <ul>
            <li className="mb-4">
              <Link to="/admin/overview" className="hover:text-blue-400">Overview</Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/donors" className="hover:text-blue-400">Donors</Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/ngos" className="hover:text-blue-400">NGOs</Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/report" className="hover:text-blue-400">Reports</Link>
            </li>
          </ul>
        </div>
      
      </div>
  );
};

export default AdminNavbar;
