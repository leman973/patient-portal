import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import AllDoctors from "./pages/AllDoctors";
import Navbar from "./Components/Navbar";
import Booking from "./pages/Booking";
import Footer from "./Components/Footer";

function LayoutWithNavbar() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/doctors/:speciality" element={<AllDoctors />} />
          <Route path="/bookings/:speciality" element={<Booking />}></Route>
          <Route path="/bookings" element={<Booking />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Routes WITHOUT navbar */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Routes WITH navbar */}
      <Route path="/*" element={<LayoutWithNavbar />} />
    </Routes>
  );
}

export default App;
