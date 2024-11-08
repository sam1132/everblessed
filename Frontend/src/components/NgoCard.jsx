import React from "react";
import hero from "../assets/hero.jpg";
const NgoCard = ({ title, organization, description, totalDonation ,onDonateClick}) => {
  return (
    <div className="my-7 flex flex-col lg:flex-row w-full max-w-4xl mx-auto shadow-md rounded-md">
      <div className="w-full lg:w-72">
        <img
          src={hero}
          alt="donation image"
          className="w-full h-auto object-cover rounded-t-md lg:rounded-l-md lg:rounded-t-none"
        />
      </div>
      <div className="flex-1 p-5">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-3 lg:mb-0">
            <h1 className="font-semibold text-xl lg:text-2xl">{title}</h1>
            <p className="text-sm text-gray-500">By {organization}</p>
          </div>
          <div className="text-left lg:text-right">
            <h1 className="font-semibold text-xl lg:text-2xl">Total Donation made</h1>
            <p className="text-sm text-gray-500 font-bold my-2">{totalDonation}</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3 my-4">
          <p className="font-semibold text-gray-500">Details:</p>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <button 
          onClick={onDonateClick}
          className="text-white hover:bg-[#ff5252] bg-[#ff3333] px-4 py-1 font-semibold transition-all duration-300 rounded-md">
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default NgoCard;
