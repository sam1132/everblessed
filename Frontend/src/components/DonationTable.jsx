import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DonationTable = ({ donations, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">NGO Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Donation Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Quantity Needed</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Item Type</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.length > 0 ? (
            donations.map((donation, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="px-4 py-2 text-sm text-gray-600">{donation.ngoName}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{donation.donationName}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{donation.quantityNeeded}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{donation.itemType}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{donation.description}</td>
                <td className="px-4 py-2 text-center text-red-500">
                  <button onClick={() => handleDelete(index)} aria-label="Delete donation">
                    <FaTrash className="inline w-5 h-5 hover:text-red-700 transition duration-150" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                No donations available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;
