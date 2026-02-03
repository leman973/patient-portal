// src/Components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-success" to="/home">
          🏥 CarePlus Clinic
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-success me-2 fw-bold" to="/doctors">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-success me-2 fw-bold" to="/home">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-success me-2 fw-bold" to="/home">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-info text-white fw-bold me-3" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-info text-white fw-bold me-3" to="/signup">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
