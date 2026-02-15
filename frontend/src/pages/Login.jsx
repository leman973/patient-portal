import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage = location.state?.error;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);

      window.history.replaceState({}, document.title);
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!email || !password) {
      toast.error(" Please fill in all fields!");
      setLoader(false);
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
      })
      const data = res.data;
      const token = data.jwtToken;
      const userRole = data.userRole
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);

      toast.success(res.data.message || "Login successful");
      navigate("/home");
    } catch (error) {
      const message = error.response?.data?.message || "Login Failed please try again";
      toast.error(message);
    } finally {
      setLoader(false);
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
              className="btn w-100 mt-3 d-flex justify-content-center align-items-center"
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
              {loader ? (
                <div
                  className="spinner-border text-light"
                  role="status"
                  style={{ width: "1.2rem", height: "1.2rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "#4CAF50", fontWeight: "bold" }}>
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
