import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import SignupImg from "../assets/Login/signup-image.jpg";
import axios from "axios";
import toast from 'react-hot-toast'
const Signup = () => {
  const navigate = useNavigate()
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [Error, setError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!User.username.trim()) {
      nameError = "Username is required.";
      isValid = false;
    } else if (User.username.trim().length < 3) {
      nameError = "Username must be at least 3 characters long.";
      isValid = false;
    }

    if (!User.email.trim()) {
      emailError = "Email is required.";
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(User.email)) {
        emailError = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (!User.password.trim()) {
      passwordError = "Password is required.";
      isValid = false;
    } else if (User.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setError({
      nameError,
      emailError,
      passwordError,
    });

   try {
    const response = await axios.post('http://localhost:4000/user/signup',User)
    toast.success("Sign up successfull");
   } catch (error) {
    toast.error("User already exist")
   }
   setUser({ username: '', email: '', password: '' });
  navigate('/signin')
  };
  return (
    <>
      <section className="flex justify-center items-center h-[100vh] m-7">
        <div className="shadow-gray-400 shadow-lg py-11 md:flex  md:items-center bg-[#fff]  rounded-xl w-[600px] md:h-[600px] md:w-[55rem] ">
          <div className="md:pl-11 md:mr-[55px] md:ml-[35px]">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="px-10 md:px-0 md:w-[21.3rem]"
            >
              <h2 className="text-3xl font-bold p-2 mb-[1rem]">Sign up</h2>
              <div className="py-[0.5rem] px-[2rem] mb-[1rem]  border-b-[1px]  border-[#092327] relative">
                <span className="absolute -left-0 top-[1.3rem] text-gray-700">
                  <FaUser />
                </span>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Fullname"
                  name="username"
                  value={User.username}
                  onChange={handleChange}
                  className=" outline-none w-full border-none focus:ring-0"
                />
              </div>
              {Error.nameError && (
                <p className="text-red-500 text-sm mt-1 mb-2">
                  {Error.nameError}
                </p>
              )}
              <div className="py-[0.5rem] px-[2rem] relative mb-[1rem]  border-b-[1px] border-[#092327]  ">
                <span className="absolute -left-0 top-[1.3rem] text-gray-700">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  name="email"
                  value={User.email}
                  onChange={handleChange}
                  className=" outline-none w-full border-none focus:ring-0"
                />
              </div>
              {Error.emailError && (
                <p className="text-red-500 text-sm mt-1 mb-2">
                  {Error.emailError}
                </p>
              )}
              <div className="py-[0.5rem] px-[2rem] relative mb-[1rem]  border-b-[1px] border-[#092327]  ">
                <span className="absolute -left-0 top-[1.3rem] text-gray-700">
                  <RiLockPasswordLine />
                </span>
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  name="password"
                  value={User.password}
                  onChange={handleChange}
                  className=" outline-none border-none w-full focus:ring-0"
                />
              </div>
              {Error.passwordError && (
                <p className="text-red-500 text-sm mt-1 mb-2">
                  {Error.passwordError}
                </p>
              )}

              <button
                type="submit"
                className="w-full p-[0.5rem] bg-[#007bff] font-bold text-white border-none rounded-md cursor-pointer mt-6"
              >
                Register
              </button>
              <div className="mt-6 font-semibold text-md">
                <p>
                  Already Registered?
                  <Link
                    to="/signin"
                    className="cursor-pointer text-slate-600 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Form div ends */}
          <div className="mx-12 mt-11 md:block hidden">
            <div>
              <img src={SignupImg} alt="signup image" className="w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
