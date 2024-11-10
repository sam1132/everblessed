import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import loginimg from "../assets/Login/signin-image.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
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
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        User
      );
      const token = response.data.token;
      const role = response.data.role;
      if (token){
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("id", response.data.id);
      }
      else{
        console.error("No token received from the server.");
        toast.error("Error login");
      }

      if (role === "user") {
        toast.success("Login successfull");
        setUser({ email: "", password: "" });
        navigate("/");
        setTimeout(()=>{
          window.location.reload()
        },1000)
      } 
      else if (role === "ngo") {
        toast.success("Login successfull");
        setUser({ email: "", password: "" });
        navigate("/ngo/dashboard/overview");
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }
      else {
        console.error("No token received from the server.");
      }
    } catch (error) {
      toast.error("Error login");
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-[100vh] m-7 z-10">
        <div className="shadow-gray-400 shadow-lg py-11 md:flex  md:items-center bg-[#fff]  rounded-xl w-[600px] md:h-[600px] md:w-[55rem] ">
          <div className="mx-12 mt-11 md:block hidden">
            <div>
              <img src={loginimg} alt="login image" className="w-full" />
            </div>
          </div>
          <div className="md:pl-11 md:mr-[55px] md:ml-[35px]">
            <form
              noValidate
              className="px-10 md:px-0 md:w-[21.3rem]"
              onSubmit={handleSubmit}
            >
              <h2 className="text-3xl font-bold p-2 mb-[1rem]">Log In</h2>
              <div className="py-[0.5rem] px-[2rem] relative mb-[1rem]  border-b-[1px] border-[#092327]  ">
                <span className="absolute -left-0 top-[0.8rem] text-gray-700">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={User.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className=" outline-none w-full border-none focus:ring-0"
                />
              </div>
              <div className="py-[0.5rem] px-[2rem] relative mb-[1rem]  border-b-[1px] border-[#092327]  ">
                <span className="absolute -left-0 top-[0.75rem] text-gray-700">
                  <RiLockPasswordLine />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={User.password}
                  onChange={handleChange}
                  autoComplete="off"
                  className=" outline-none w-full border-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="w-full p-[0.5rem] bg-[#007bff] font-bold text-white border-none rounded-md cursor-pointer mt-6"
              >
                Log In
              </button>
              {/* <div>
                <div className="my-4 bg-[#007bff] font-bold cursor-pointer text-white rounded-md text-center p-2"  onClick={handleGoogleLogin}>
                  <p>
                    <span >Log in with google</span>
                  </p>
                </div>
              </div> */}
              <div className="mt-6 font-semibold text-md">
                <p>
                  Create an Account
                  <Link to="/signup" className="text-blue-600 hover:underline ml-2">
                Register
              </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
