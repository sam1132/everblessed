import Home from "./pages/Home"
import AllNgosPage from "./pages/Allngopage"
import UserDashboard from "./pages/UserDashboard"
import About from "./pages/About"
import {  Route, Routes,BrowserRouter as Router } from "react-router-dom"
function App() {
  return (
    <>
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allngos" element={<AllNgosPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
