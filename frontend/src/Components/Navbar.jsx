import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-success" to="/">
          🏥 CarePlus Clinic
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search Bar */}
          <form className="d-flex mx-auto" style={{ width: "45%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search doctors or speciality"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Auth Buttons */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="btn btn-outline-success me-2" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-success" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
