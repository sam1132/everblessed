import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.jpg";
import { CiForkAndKnife } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { ImBooks } from "react-icons/im";

const Home = () => {
  return (
    <>
      <Navbar />
      <section>
        <header className="max-w-[95rem] mx-auto h-[356px] bg-[#00b4d8] px-8 md:px-10 pt-7  md:pt-0 ">
          <div className="flex flex-col md:flex-row  ">
            <div className="md:mt-20">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-white ">
                  Bless Others Through Your
                  <span className="block">Generosity</span>
                </h1>
                <p className="max-w-[600px] text-white  md:text-xl">
                  Your donations of food, clothes, or books can bring hope to
                  the elderly and children in need.
                </p>
              </div>
              <div className="flex flex-col md:flex-row mt-9">
                <button className="bg-[#ff5252] hover:bg-[#ff3333] cursor-pointer text-white font-semibold p-2 rounded-md">
                  Donate Now
                </button>
                <button className="bg-white text-[#00b4d8] hover:bg-gray-100 p-2 rounded-md font-semibold md:ml-4 mt-4 md:mt-0">
                  Learn More
                </button>
              </div>
            </div>
            <div className="ml-48  p-3">
              <img
                src={heroImg}
                alt="donation"
                className="w-full h-[330px] object-cover rounded-md md:block hidden"
              />
            </div>
          </div>
        </header>
        <section className="max-w-[95rem] mx-auto px-8 md:px-10 my-5">
              
        </section>
        <section>
          <div className="max-w-[95rem] mx-auto px-8 md:px-10 py-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center  md:text-4xl lg:text-5xl/none text-[#ff3333]">
              Ways to Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className=" px-4 py-6 rounded-md shadow-md border">
                <p className="flex items-center justify-center">
                  <CiForkAndKnife className="w-8 h-8  text-[#00b4d8]" />
                </p>
                <h3 className="text-xl font-bold text-center ">Donate Food</h3>
                <p className="mt-2 text-gray-500 px-4 text-center">
                  Help fight hunger by donating non-perishable food items.
                </p>
                <div className="flex justify-center">
                  <button className="bg-[#ff3333] mt-4  cursor-pointer text-white font-semibold p-2 rounded-md">
                    Donate Food
                  </button>
                </div>
              </div>
              <div className=" px-4 py-6 rounded-md shadow-md border">
                <p className="flex items-center justify-center">
                  <ImBooks className="w-8 h-8  text-[#00b4d8]" />
                </p>
                <h3 className="text-xl font-bold text-center ">Donate Books</h3>
                <p className="mt-2 text-gray-500 px-4 text-center">
                  Spread knowledge and joy by donating books for all ages
                </p>
                <div className="flex justify-center">
                  <button className="bg-[#ff3333] mt-4  cursor-pointer text-white font-semibold p-2 rounded-md">
                    Donate Books
                  </button>
                </div>
              </div>
              <div className=" px-4 py-6 rounded-md shadow-md border">
                <p className="flex items-center justify-center">
                  <GiClothes className="w-8 h-8  text-[#00b4d8]" />
                </p>
                <h3 className="text-xl font-bold text-center ">
                  Donate Clothes
                </h3>
                <p className="mt-2 text-gray-500 px-4 text-center">
                  Provide warmth and dignity with gently used or new clothing
                </p>
                <div className="flex justify-center">
                  <button className="bg-[#ff3333] mt-4  cursor-pointer text-white font-semibold p-2 rounded-md">
                    Donate Clothes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-[95rem] mx-auto px-8 md:px-10 my-5">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only ">
                Select tab
              </label>
              <select
                id="tabs"
                className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-xl font-semibold text-center rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="#stats">Statistics</option>
              </select>
            </div>

            <ul
              className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
              id="fullWidthTab"
              role="tablist"
            >
              <li className="w-full">
                <button
                  id="stats-tab"
                  data-tabs-target="#stats"
                  type="button"
                  role="tab"
                  aria-controls="stats"
                  aria-selected="true"
                  className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Statistics
                </button>
              </li>
            </ul>

            <div
              id="fullWidthTabContent"
              className="border-t border-gray-200 dark:border-gray-600"
            >
              <div
                className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
              >
                <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-4 dark:text-white sm:p-8">
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl md:text-3xl font-extrabold">2M+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Peoples</dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl md:text-3xl font-extrabold">4M+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      Donations
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-2xl md:text-3xl font-extrabold">500+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      Active User
                    </dd>
                  </div>
                 
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                    <dd className="text-gray-500 dark:text-gray-400">
                      NGO's
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

      </section>
    </>
  );
};

export default Home;
