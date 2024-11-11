import React from "react";
import { Route,Routes } from "react-router-dom";
import Userprofile from "../pages/Userprofile";
import UserDonation from "../pages/UserDonation";

const UserRoutes = () => {
  return (
  <Routes>
    <Route path="/profile" element={<Userprofile />} />
    <Route path="/mydonations" element={<UserDonation />} />
    </Routes>
  )
}

export default UserRoutes