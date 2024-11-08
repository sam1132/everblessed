import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate, useLocation } from "react-router-dom";

const DonationForm = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultCategory = params.get("category") || 'anything';

  const onSubmit = (data) => {
    console.log(data);
    reset();
    navigate('/')
  };

  return (
<>
    <h1 className="text-2xl text-[#00b4d8] font-bold text-center my-5">Donation Form</h1>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 my-7 max-w-lg mx-auto p-5 border border-gray-200 rounded-md shadow-lg"
    >
      <div>
        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          {...register("fullName", { required: "Full name is required" })}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Enter a valid email",
            },
          })}
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit phone number",
            },
          })}
          type="tel"
          maxLength={10}
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Quantity</label>
        <input
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 10, message: "Quantity must be at least 10" },
            pattern:{
                value: /^[0-9]*$/,
                message: "Enter a valid quantity"
            }
          })}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Pickup Address</label>
        <input
          {...register("pickupAddress", { required: "Pickup address is required" })}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        />
        {errors.pickupAddress && <p className="text-red-500 text-sm">{errors.pickupAddress.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Donation Category</label>
        <select
          {...register("donationCategory", { required: "Please select a donation category" })}
          className="w-full p-2 border border-gray-300 rounded-md outline-none"
        >
          <option value="Food" selected={defaultCategory === "Food"}>Food</option>
          <option value="Books" selected={defaultCategory === "Books"}>Books</option>
          <option value="Toys" selected={defaultCategory === "Toys"}>Toys</option>
          <option value="Blankets" selected={defaultCategory === "Blankets"}>Blankets</option>
        </select>
        {errors.donationCategory && (
          <p className="text-red-500 text-sm">{errors.donationCategory.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md outline-none hover:bg-blue-600 transition-colors"
      >
        Submit Donation
      </button>
    </form>
    </>
  );
};

export default DonationForm;
