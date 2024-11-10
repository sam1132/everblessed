import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signin from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserRoutes from "./Routes/UserRoutes";
import NgoRoutes from "./Routes/NgoRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import MultiStepSignup from "./pages/MultiStepSignup";

function Layout() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname.startsWith('/admin') || location.pathname.includes("/ngo/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/ngo/*" element={<NgoRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<MultiStepSignup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
