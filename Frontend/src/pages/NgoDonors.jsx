import React from "react";
import NgoDonorList from "../components/NgoDonorList";
const NgoDonors = () => {
  return <>
  <div className=" w-[22rem] md:w-full my-10 p-4 rounded-md  bg-white ">
          <h1 className="text-xl font-semibold md:text-2xl">Donors List</h1>
          <p className="text-gray-500">A list of all donors list with the  NGO</p>
          <div className="mt-5">
            <NgoDonorList />
          </div>
        </div>
  </>;
};

export default NgoDonors;
