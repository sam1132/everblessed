import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";

const MultiStepSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setCurrentStep(2);
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));

  const onSubmit = async (data) => {
    try {
      if (role === "user") {
        await axios.post("http://localhost:4000/user/signup", data);
      } else {
        await axios.post("http://localhost:4000/ngo/signup", data);
      }
      toast.success("Registration successful");
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error("Error during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl mx-5 md:mx-0 p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
              <div className="flex justify-around">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("user")}
                  className="w-1/2 p-2 bg-blue-500 font-semibold md:text-xl text-lg text-white rounded mr-2"
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect("ngo")}
                  className="w-1/2 p-2 bg-green-500 font-semibold md:text-xl text-lg text-white rounded ml-2"
                >
                  NGO
                </button>
              </div>
            </>
          )}

          {role === "user" && currentStep > 1 && (
            <>
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">User Info</h2>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Full Name"
                    className="w-full p-2 mb-3 border rounded-md outline-none"
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                  <input
                    type="text"
                    {...register("mobileno", { required: "Mobile Number is required" })}
                    placeholder="Mobile Number"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.mobileno && <p className="text-red-500">{errors.mobileno.message}</p>}

                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full p-2 bg-gray-500 text-white rounded"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full p-2 bg-blue-500 text-white rounded ml-4 outline-none"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Address"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                   <input
                    type="text"
                    {...register("state")}
                    placeholder="State"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                   <input
                    type="text"
                    {...register("city")}
                    placeholder="City"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full p-2 bg-gray-500 text-white rounded outline-none"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="w-full p-2 bg-green-500 text-white rounded outline-none ml-4"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {role === "ngo" && currentStep > 1 && (
            <>
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">NGO Info</h2>
                  <input
                    type="text"
                    {...register("ngoname", { required: "NGO Name is required" })}
                    placeholder="NGO Name"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.ngoname && <p className="text-red-500">{errors.ngoname.message}</p>}

                  <input
                    type="text"
                    {...register("registrationNumber", { required: "Registration Number is required" })}
                    placeholder="Registration Number"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}

                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full p-2 bg-gray-500 text-white rounded outline-none"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full p-2 bg-blue-500 text-white rounded outline-none ml-4"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <input
                    type="text"
                    {...register("address", { required: "Address is required" })}
                    placeholder="Address"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />
                  {errors.address && <p className="text-red-500">{errors.address.message}</p>}

                  <input
                    type="text"
                    {...register("description")}
                    placeholder="Description"
                    className="w-full p-2 mb-3 border rounded outline-none"
                  />

                  <select
                    {...register("thingsRequired")}
                    className="w-full p-2 mb-3 border rounded outline-none"
                  >
                    <option value="book">Books</option>
                    <option value="blankets">Blankets</option>
                    <option value="toys">Toys</option>
                    <option value="stationary">Stationary</option>
                    <option value="anything">Anything</option>
                  </select>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full p-2 bg-gray-500 text-white rounded outline-none"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="w-full p-2 bg-green-500 text-white rounded outline-none ml-4"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          <div className="mt-4 text-center">
            <p>
              Already registered?
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepSignup;
