import React from 'react'
import NgoNavbar from '../components/NgoNavbar'
import { Routes,Route } from 'react-router-dom'
import NgoOverview from './NgoOverview'
import NgoDonors from './NgoDonors'
import Donations from './Donations'
import NgoProfile from './NgoProfile'
const NgoDashboard = () => {
  return (
    <>
    <div className='bg-gray-200 max-w-[95rem] mx-auto px-8 md:px-10  md:pt-0  grid md:grid-cols-5 space-x-2'>
      <div className='md:col-span-2 lg:col-span-1 mb-10 md:mb-0'>
      <NgoNavbar />
      </div>
      <div className='md:col-span-3 lg:col-span-4'>
        {/* routes */}
        <Routes>
          <Route path="overview" element={<NgoOverview />} /> 
          <Route path="donors" element={<NgoDonors />} />
          <Route path="donations" element={<Donations />} />
          <Route path="profile" element={<NgoProfile />} />
        </Routes>
      </div>
      </div>
    </>
  )
}

export default NgoDashboard