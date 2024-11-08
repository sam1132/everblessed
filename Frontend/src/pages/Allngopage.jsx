import React, { useState } from "react";
import NgoCard from "../components/NgoCard";
import DonationForm from "../components/Donationform";
import { useNavigate } from "react-router-dom";

const AllNgosPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();   
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const ngos = [
    {
      title: "Donate Books",
      organization: "The Educator",
      description:
        "We are a group of educators who are working towards providing education to the underprivileged children. We are looking for donations in the form of books.",
      type: "Books",
      totalDonation: "200",
    },
    {
      title: "Food Drive",
      organization: "Feed the Need",
      description:
        "Help us provide food supplies to families in need. Every donation helps fight hunger and provide essential meals.",
      type: "Food",
      totalDonation: "500",
    },
  ];

  const filteredNgos = ngos.filter((ngo) => {
    return filterType ? ngo.type === filterType : true;
  });

  const handleFilter = (type) => {
    setFilterType(type);
    setIsOpen(false);
  };

  const resetFilter = () => {
    setFilterType(null);
  };
  const handleDonateClick = (category) => {
    setSelectedCategory(category);
navigate("/ngo/donate?category=" + category);
};
  return (
    <div className="max-w-[95rem] mx-auto px-8 md:px-10 pt-7 md:pt-0">
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="my-6 text-white font-semibold px-3 py-2 rounded-md bg-[#ff3333] focus:outline-none"
        >
          Sort By
        </button>
        {isOpen && (
          <div className="absolute right-50 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transform transition-transform duration-300 ease-out">
            <ul className="py-1">
              <li className="px-4 py-2 text-gray-700 font-semibold border-b-2 border-gray-200">
                Donation Type
              </li>
              <li>
                <button
                  onClick={() => handleFilter("Food")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Food
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilter("Books")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilter("Toys")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Toys
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilter("Blankets")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Blankets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilter("stationary")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Stationary
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {filterType && (
        <button
          onClick={resetFilter}
          className="mb-6 ml-4 bg-[#ff3333] text-white py-2 px-3 rounded-md font-semibold  focus:outline-none"
        >
          Show All Donations
        </button>
      )}

      <div>
        {filteredNgos.length > 0 ? (
          filteredNgos.map((ngo, index) => (
            <NgoCard
              key={index}
              title={ngo.title}
              organization={ngo.organization}
              description={ngo.description}
              totalDonation={ngo.totalDonation}
              onDonateClick={() => handleDonateClick(ngo.type)}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center mt-8">
            No NGOs available for the selected donation type.
          </p>
        )}

        {selectedCategory && (
          <div className="mt-8">
            <DonationForm defaultCategory={selectedCategory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNgosPage;
