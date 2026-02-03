import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validations
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Placeholder for backend API call
    console.log({
      name,
      email,
      password,
    });

    toast.success("Registration successful!");
  };

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      {/* Centered Card */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card shadow-lg p-4"
          style={{
            minWidth: "400px",
            borderRadius: "15px",
            backgroundColor: "#ffffff",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#333" }}>
            🏥 Patient Registration
          </h3>

          <form onSubmit={handleSubmit} style={{ fontSize: "0.9rem" }}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Patient Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label fw-bold">Age</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
                style={{ borderRadius: "8px" }}
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label fw-bold">Gender</label>
              <select
                className="form-select form-select-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ borderRadius: "8px" }}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div className="mb-3">
              <label className="form-label fw-bold">Phone Number</label>
              <input
                type="tel"
                className="form-control form-control-sm"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="10"
                style={{ borderRadius: "8px" }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>


            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>


            {/* Confirm Password
            <div className="mb-3">
              <label className="form-label fw-bold">Confirm Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div> */}

            {/* Button */}
            <button
              type="submit"
              className="btn w-100 mt-3"
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#4CAF50", fontWeight: "bold" }}>
              Login
            </a>
          </p>

          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-2"
        style={{ color: "#333", fontWeight: "500" }}
      >
        © 2026 Patient Portal | All Rights Reserved
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
