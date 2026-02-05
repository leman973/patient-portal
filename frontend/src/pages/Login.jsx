import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(" Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      })
      const data = res.data;
      const token = data.jwtToken;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", data.userId);


      toast.success(res.data.message || "Login successful");
      navigate("/home");
    } catch (error) {
      const message = error.response?.data?.message || "Login Failed please try again";
      toast.error(message);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-between vh-100"
      style={{
        height: "100vh",
      }}
    >
      {/* Centered Card */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card shadow-lg p-4"
          style={{
            minWidth: "380px",
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
            🏥 Patient Portal Login
          </h3>

          <form onSubmit={handleSubmit} style={{ fontSize: "0.9rem" }}>
            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #fffff",
                  transition: "0.3s",
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  transition: "0.3s",
                }}
              />
            </div>

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
              Login
            </button>
          </form>

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Don’t have an account?{" "}
            <a href="/signup" style={{ color: "#4CAF50", fontWeight: "bold" }}>
              Signup
            </a>
          </p>

          {/* Toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </div>
      </div>

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
