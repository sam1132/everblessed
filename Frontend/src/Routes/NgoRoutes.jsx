import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NgoDashboard from "../pages/NgoDashboard";
import DonationForm from '../components/Donationform';
import ProtectedRoute from '../pages/ProtectedRoute';
const NgoRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/dashboard/*" element={<NgoDashboard />} />
        </Route>
    </Routes>
  )
}

export default NgoRoutes