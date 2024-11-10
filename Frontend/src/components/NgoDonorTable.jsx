import React from 'react';
import { FaTrash } from 'react-icons/fa';

const NgoDonorTable = () => {
  const donors = [
    { id: 1, name: 'John Doe', item: 'Books', quantity: 5, date: '2023-10-12' },
    { id: 2, name: 'Jane Smith', item: 'Clothes', quantity: 10, date: '2023-10-13' },
    { id: 3, name: 'Sam Wilson', item: 'Food Supplies', quantity: 15, date: '2023-10-14' },
    // Add more entries as needed
  ];

  const handleDelete = (id) => {
    // Handle delete action here (e.g., API call or updating state)
    console.log(`Delete donor with ID: ${id}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full  bg-white  shadow-md rounded-md">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-200 bg-gray-100 text-left text-gray-600 text-sm font-semibold">Donor Name</th>
              <th className="p-4 border-b border-gray-200 bg-gray-100 text-left text-gray-600 text-sm font-semibold">Item Donated</th>
              <th className="p-4 border-b border-gray-200 bg-gray-100 text-left text-gray-600 text-sm font-semibold">Quantity</th>
              <th className="p-4 border-b border-gray-200 bg-gray-100 text-left text-gray-600 text-sm font-semibold">Date</th>
              <th className="p-4 border-b border-gray-200 bg-gray-100 text-center text-gray-600 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200 text-sm text-gray-700">{donor.name}</td>
                <td className="p-4 border-b border-gray-200 text-sm text-gray-700">{donor.item}</td>
                <td className="p-4 border-b border-gray-200 text-sm text-gray-700">{donor.quantity}</td>
                <td className="p-4 border-b border-gray-200 text-sm text-gray-700">{donor.date}</td>
                <td className="p-4 border-b border-gray-200 text-center">
                  <button onClick={() => handleDelete(donor.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NgoDonorTable;
