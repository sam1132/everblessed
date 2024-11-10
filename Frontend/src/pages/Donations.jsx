import React from 'react'
import CreateDonation from '../components/CreateDonation'
const Donations = () => {
  return (
    <div className=" w-[22rem] md:w-full my-10 p-4 rounded-md  bg-white ">
          <h1 className="text-xl font-semibold md:text-2xl">Create Donations</h1>
          <p className="text-gray-500">Specify the items needed for donation</p>
          <div className="mt-5">
            <CreateDonation/>
          </div>
        </div>
  )
}

export default Donations