import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBoxArchive, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md mx-2">
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink
                to="/"
                className="ml-2 text-xl font-bold flex items-center gap-x-2"
              >
                EverBlessed
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-md md:text-2xl font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-md md:text-2xl font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-md md:text-2xl font-medium"
                  >
                    SignIn
                  </NavLink>
                </>
              )}
              <NavLink
                to="/donate"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-md md:text-2xl font-medium"
              >
                Donate
              </NavLink>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-md md:text-2xl font-medium"
                >
                  Account
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <NavLink
                        to="/user/profile"
                        className="flex gap-x-2 items-center px-4 py-2 text-lg text-gray-700 hover:text-black hover:bg-gray-100"
                        role="menuitem"
                      >
                        <span>
                          <CgProfile />
                        </span>
                        Profile
                      </NavLink>
                      <NavLink
                        to="/user/mydonations"
                        className="flex items-center gap-x-2 px-4 py-2 text-lg text-gray-700 hover:text-black hover:bg-gray-100"
                        role="menuitem"
                      >
                        <span>
                          <FaBoxArchive className="h-4 w-4" />
                        </span>
                        My Donation
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-md md:text-2xl font-medium"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signin"
                  className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  SignIn
                </NavLink>
              </>
            )}
            <NavLink
              to="/donate"
              className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Donate
            </NavLink>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Account
            </button>
            {isDropdownOpen && (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink
                  to="/profile"
                  className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/mydonations"
                  className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                >
                  My donation
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
