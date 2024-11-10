import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const NgoNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <>
      <aside className="md:w-64 rounded-md mt-7 md:mt-10 bg-white w-[22rem] py-5  md:h-screen shadow-lg">
        <h2 className="font-bold text-xl md:text-2xl p-6">NGO Dashboard</h2>
        <nav className="mt-8 cursor-pointer ">
          <ul>
            <li className="mb-4 px-6 py-2 flex items-center hover:bg-gray-200 gap-x-2">
              <FaHome className="text-green-400  text-xl font-bold" />
              <Link to="overview" className=" text-gray-600 text-xl font-bold">
                Dashboard
              </Link>
            </li>
            <li className="mb-4 px-6 py-2  flex items-center hover:bg-gray-200 gap-x-2">
              <FaHandHoldingHeart className="text-purple-500  text-xl font-bold" />
              <Link to="donations" className=" text-gray-600 text-xl font-bold">
                Donations
              </Link>
            </li>
            <li className="mb-4 px-6 py-2 flex items-center hover:bg-gray-200 gap-x-2">
              <FaUsers className="text-orange-400  text-xl font-bold" />
              <Link to="donors" className=" text-gray-600 text-xl font-bold">
                Donors
              </Link>
            </li>
            <li className="mb-4 px-6 py-2 flex items-center gap-x-2 hover:bg-gray-200">
              <CgProfile className="text-blue-400  text-xl font-bold" />
              <Link to="profile" className=" text-gray-500  text-xl font-bold">
                Profile
              </Link>
            </li>
            <li className="mb-4 px-6 py-2 flex items-center gap-x-2 hover:bg-gray-200">
              <CiLogout className="text-blue-400  text-xl font-bold" />
              <Link to="/" className=" text-gray-500  text-xl font-bold" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default NgoNavbar;
