import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNgosPage from "../pages/Allngopage";
import NgoDashboard from "../pages/NgoDashboard";
const NgoRoutes = () => {
  return (
    <Routes>
        <Route path="/allngos" element={<AllNgosPage />} />
        <Route path="/dashboard" element={<NgoDashboard />} />
    </Routes>
  )
}

export default NgoRoutes