// src/Components/Navbar.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);

      } catch (error) {
        console.error("Failed to fetch user details", error);
      }

    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");;
    setUser(null);
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left: Logo */}
        <NavLink className="navbar-brand fw-bold text-success" to="/home">
          🏥 CarePlus Clinic
        </NavLink>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center: Nav links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `nav-link text-success fw-bold mx-2 ${isActive ? "border-bottom border-2" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `nav-link text-success fw-bold mx-2 ${isActive ? "border-bottom border-2" : ""}`
                }
              >
                Doctors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link text-success fw-bold mx-2 ${isActive ? "border-bottom border-2" : ""}`
                }
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link text-success fw-bold mx-2 ${isActive ? "border-bottom border-2" : ""}`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right: Login/Register buttons */}
        <div className="d-flex align-items-center ms-lg-3">
          {!user ? (
            <>
              <NavLink to="/login" className="btn btn-info text-white fw-bold me-2">
                Login
              </NavLink>
              <NavLink to="/signup" className="btn btn-info text-white fw-bold">
                Register
              </NavLink>
            </>
          ) : (<div className="dropdown">
            <button
              className="btn p-0 border-0 bg-transparent dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center bg-light shadow"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FaUser size={20} />
                </div>
              )}
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li className="px-3 py-2 fw-bold text-success">
                {user.name}
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item" to="/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/bookings">
                  My Bookings
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </li>
            </ul>
          </div>)}
        </div>

      </div>
    </nav>
  );
}
