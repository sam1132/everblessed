import React, { useState, useEffect } from "react";
import NgoCard from "../components/NgoCard";
import DonationForm from "../components/Donationform";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllNgosPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/ngo/getDonations");
        setNgos(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchNgos();
  }, []);

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

  const handleDonateClick = (id) => {
    navigate("/ngo/donate?id=" + id);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                  onClick={() => handleFilter("Stationary")}
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
              title={ngo.donationName}
              description={ngo.description}
              totalDonation={ngo.quantityNeeded}
              onDonateClick={() => handleDonateClick(ngo._id)}
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
