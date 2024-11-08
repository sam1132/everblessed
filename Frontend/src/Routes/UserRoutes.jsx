import React from "react";
import { Route,Routes } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard"
import Userprofile from "../pages/Userprofile";
import UserDonation from "../pages/UserDonation";

const UserRoutes = () => {
  return (
  <Routes>
    <Route path="/dashboard" element={<UserDashboard />} />
    <Route path="/profile" element={<Userprofile />} />
    <Route path="/mydonations" element={<UserDonation />} />
    </Routes>
  )
}

export default UserRoutes