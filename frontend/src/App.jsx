import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import AllDoctors from "./pages/AllDoctors";
import Navbar from "./Components/Navbar";
import Booking from "./pages/Booking";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/doctors/:speciality" element={<AllDoctors />} />
        <Route path="/bookings/:speciality" element={<Booking />}></Route>
        <Route path="/bookings" element={<Booking />}></Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Routes WITHOUT navbar */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes WITH navbar */}
      <Route path="/*" element={<LayoutWithNavbar />} />
    </Routes>
  );
}

export default App;
