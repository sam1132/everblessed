import React from "react";
import { FaChartBar } from "react-icons/fa";
import NgoDonorTable from "../components/NgodonorTable";
const NgoOverview = () => {
  return (
    <>
      <main className="md:my-10 md:py-10 py-5">
        <h1 className=" text-3xl md:text-4xl font-semibold p-2 mb-5 ">
          Overview
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          <div className="w-[22rem] md:w-full bg-white p-6 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-2xl  ">Total Requests</p>
              <FaChartBar className="text-2xl" />
            </div>
            <p className="mt-2 font-bold text-xl md:text-3xl">3</p>
          </div>
          <div className="w-[22rem] md:w-full bg-white p-6 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-2xl  ">Total Donations</p>
              <FaChartBar className="text-2xl" />
            </div>
            <p className="mt-2 font-bold text-xl md:text-3xl">2</p>
          </div>
          <div className="w-[22rem] md:w-full bg-white p-6 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-xl md:text-2xl  ">Total Items Received</p>
              <FaChartBar className="text-2xl" />
            </div>
            <p className="mt-2 font-bold text-xl md:text-3xl">2</p>
          </div>
        </div>
        <div className=" w-[22rem] md:w-full my-10 p-4 rounded-md  bg-white ">
          <h1 className="text-xl font-semibold md:text-2xl">Recent Donations</h1>
          <p className="text-gray-500">A list of all donations received by the NGO</p>
          <div className="mt-5">
            <NgoDonorTable />
          </div>
        </div>
      </main>
    </>
  );
};

export default NgoOverview;