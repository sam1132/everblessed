import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NgoDashboard from "../pages/NgoDashboard";
import DonationForm from '../components/Donationform';
const NgoRoutes = () => {
  return (
    <Routes>
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/dashboard/*" element={<NgoDashboard />} />
    </Routes>
  )
}

export default NgoRoutes