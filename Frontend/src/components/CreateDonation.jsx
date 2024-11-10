import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DonationTable from './DonationTable';
import axios from 'axios';

const CreateDonation = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [donations, setDonations] = useState([]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/ngo/addDonation', {
        headers: {
          'Content-Type': 'application/json',
          'authriazation': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setDonations([...donations, result]); 
      reset(); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleDelete = (index) => {
    setDonations(donations.filter((_, i) => i !== index)); // Remove donation by index
  };

  return (
    <>
    <div className="rounded-md bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">
          Donation Form
        </h2>
        <div className="grid md:grid-cols-2 gap-x-4">
          {/* NGO Name Field */}

          {/* Donation Name Field */}
          <div className="mb-4">
            <label htmlFor="donationName" className="block text-xl md:text-2xl font-semibold text-gray-600 mb-1">
              Donation Name
            </label>
            <input
              type="text"
              id="donationName"
              {...register('donationName', { required: 'Donation Name is required' })}
              className={`w-full px-4 py-2 border ${errors.donationName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Enter donation name"
            />
            {errors.donationName && <p className="text-red-500 text-xs mt-1">{errors.donationName.message}</p>}
          </div>

          {/* Quantity Needed Field */}
          <div className="mb-4">
            <label htmlFor="quantityNeeded" className="block text-xl md:text-2xl font-semibold text-gray-600 mb-1">
              Quantity Needed
            </label>
            <input
              type="number"
              id="quantityNeeded"
              {...register('quantityNeeded', {
                required: 'Quantity Needed is required',
                min: { value: 1, message: 'Quantity should be at least 1' },
              })}
              className={`w-full px-4 py-2 border ${errors.quantityNeeded ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Enter quantity needed"
            />
            {errors.quantityNeeded && <p className="text-red-500 text-xs mt-1">{errors.quantityNeeded.message}</p>}
          </div>

          {/* Item Type Field */}
          <div className="mb-4">
            <label htmlFor="itemType" className="block text-xl md:text-2xl font-semibold text-gray-600 mb-1">
              Item Type
            </label>
            <select
              id="itemType"
              {...register('itemType', { required: 'Item Type is required' })}
              className={`w-full px-4 py-2 border ${errors.itemType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
            >
              <option value="">Select an item type</option>
              <option value="toys">Toys</option>
              <option value="clothes">Clothes</option>
              <option value="food">Food</option>
              <option value="books">Books</option>
              <option value="stationary">Stationary</option>
              <option value="anything">Anything</option>
            </select>
            {errors.itemType && <p className="text-red-500 text-xs mt-1">{errors.itemType.message}</p>}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-xl md:text-2xl font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Enter description"
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Submit Donation
        </button>
      </form>
    </div>
    <div className='mt-10 p-4'>
            <h1 className="text-xl font-semibold md:text-2xl">Recent Donation Requests</h1>
            <p className="text-gray-500">A list of all donations made by the NGO</p>
          </div>
    <div className='p-4'>
    <DonationTable donations={donations} handleDelete={handleDelete}  />
    </div>
    </>
  );
};

export default CreateDonation;
