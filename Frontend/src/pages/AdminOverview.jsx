import React, { useState } from "react";
import { FaUser,FaHandHoldingHeart,FaCalendarAlt } from "react-icons/fa";
const AdminOverview = () => {
  const [Cglist, setCgList] = useState([]);

  return (
    <>
      {/* Main stats section */}
      <div className="main grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {/* Total Donation */}
        <div className="p-4 bg-gray-100 rounded shadow-md  w-[21.5rem] md:w-full lg:w-full">
          <p className="text-xl lg:text-2xl font-semibold">Total Donations</p>
          <div className="flex items-center my-5 font-sans font-bold text-xl md:text-2xl">
            <FaHandHoldingHeart className="mr-4 bg-purple-200 text-purple-400 h-10 w-10 p-2 rounded-full" />
            <span>363</span>
          </div>
        </div>

        {/* Last month TOTAL Donation */}
        <div className="p-4 bg-gray-100 rounded shadow-md  w-[21.5rem] md:w-full lg:w-full">
          <p className="text-xl lg:text-2xl font-semibold">Last Month Donation</p>
          <div className="flex items-center my-5 font-sans font-bold text-xl md:text-2xl">
            <FaCalendarAlt className="mr-4 bg-green-200 text-green-400 h-10 w-10 p-2 rounded-full" />
            <span>45</span>
          </div>
        </div>

        {/* TOTAL Donors */}
        <div className="p-4 bg-gray-100 rounded shadow-md  w-[21.5rem] md:w-full lg:w-full">
          <p className="text-xl lg:text-2xl font-semibold">Total Donors</p>
          <div className="flex items-center my-5 font-sans font-bold text-xl md:text-2xl">
            <FaUser className="mr-4 bg-orange-200 text-orange-400 h-10 w-10 p-2 rounded-full" />
            <span>200</span>
          </div>
        </div>
      </div>

      {/* Other sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Statistics */}
        <div className="lg:col-span-2 p-4 bg-gray-200 rounded shadow-md w-[21.5rem] md:w-full lg:w-full">
          Statistics
        </div>

        {/* Fundraiser Status */}
        <div className="p-4 bg-gray-200 rounded shadow-md w-[21.5rem] md:w-full lg:w-full">
          <div className="font-bold text-lg">Donations by Category</div>
        </div>
      </div>

      {/* List of donors */}
      <div className="p-4 w-[21.5rem] md:w-full lg:w-full bg-gray-200 rounded shadow-md mt-4">
        <div className="font-bold mb-2">List of Donors</div>
        <div className="table-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left">Email</th>
                <th className="px-2 py-1 text-left">Name</th>
                <th className="px-2 py-1 text-left">Campaign</th>
                <th className="px-2 py-1 text-left">Time</th>
                <th className="px-2 py-1 text-left">Donation</th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows */}
              {Cglist.length > 0 ? (
                Cglist.map((donor, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1 text-purple-600">
                      {donor.email}
                    </td>
                    <td className="border px-2 py-1">{donor.name}</td>
                    <td className="border px-2 py-1">{donor.campaign}</td>
                    <td className="border px-2 py-1">{donor.time}</td>
                    <td className="border px-2 py-1">{donor.donation}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border px-2 py-4 text-center">
                    No Donors
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
