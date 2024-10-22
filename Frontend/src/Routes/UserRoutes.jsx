import React from "react";
import { Route,Routes } from "react-router-dom";
import AllNgosPage from "../pages/Allngopage";
import UserDashboard from "../pages/UserDashboard"

const UserRoutes = () => {
  return (
  <Routes>
    <Route path="/allngos" element={<AllNgosPage />} />
    <Route path="/dashboard" element={<UserDashboard />} />
    
    </Routes>
  )
}

export default UserRoutes