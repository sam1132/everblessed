import Home from "./pages/Home"
import AllNgosPage from "./pages/Allngopage"
import UserDashboard from "./pages/UserDashboard"
import About from "./pages/About"
import Login from "./pages/Login"
import Signin from "./pages/Signup"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {  Route, Routes,BrowserRouter as Router } from "react-router-dom"
function App() {
  return (
    <>
   <Router>
   <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/allngos" element={<AllNgosPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
    </>
  )
}

export default App
