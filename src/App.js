import "./App.css";

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CustomNavbar from "./Components/Pages/Navbar";
import HomePage from "./Components/Pages/HomePage/HomePage";
import { Footer } from "./Components/Pages/Footer";
import ManagerDashboard from "./Components/Pages/ManagerDashboard/ManagerDashboard";
import EmployeeDashboard from "./Components/Pages/EmployeeDashboard/EmployeeDashboard";
import AdminDashboard from "./Components/Pages/AdminDashboard/AdminDashboard";
import { ContactUs } from "./Components/Pages/ContactUs/ContactUs";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar></CustomNavbar>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> */}
          <Route path="/register" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  );
}

export default App;
