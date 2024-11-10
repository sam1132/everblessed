import React from 'react'
import NgoNavbar from '../components/NgoNavbar'
import { Routes,Route } from 'react-router-dom'
import NgoOverview from './NgoOverview'
const NgoDashboard = () => {
  return (
    <>
    <div className='bg-gray-200 grid grid-cols-5'>
      <NgoNavbar className="md:col-span-1" />
      <div className='md:col-span-4'>
        {/* routes */}
        <Routes>
          <Route path="/overview" element={<NgoOverview />} /> 
        </Routes>
      </div>
      </div>
    </>
  )
}

export default NgoDashboard