import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

// Speciality Icons
import physician from "../assets/Physisian.png";
import neurologist from "../assets/Neurologist.png";
import dermatologist from "../assets/Dermatologist.png";
import pediatrician from "../assets/Pediatricians.png";
import gastro from "../assets/gastro.png";

const specialists = [
  { name: "General Physician", icon: physician },
  { name: "Neurologist", icon: neurologist },
  { name: "Dermatologist", icon: dermatologist },
  { name: "Pediatrician", icon: pediatrician },
  { name: "Gastroenterologist", icon: gastro },
];

export default function Home() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/doctors/top",
        );
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{ background: "linear-gradient(120deg, #198754, #20c997)" }}
      >
        <div className="container">
          <h1 className="fw-bold">Book Appointments Easily</h1>
          <p className="lead mb-4 text-white">
            Trusted doctors • Easy scheduling • Secure medical records
          </p>
          <p className="lead fw-bold fs-3 fst-italic">
            You are stronger than you think, and healthier than you believe.
          </p>
          <button
            className="btn btn-primary text-white btn-lg px-4"
            onClick={() => navigate("/bookings")}
          >
            Schedule Appointment
          </button>
        </div>
      </section>

      {/* Medical Specialities Section */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-success">
          Medical Specialities
        </h2>

        <div className="row justify-content-center g-4">
          {specialists.map((item, index) => (
            <div className="col-6 col-md-2 text-center" key={index}>
              <div
                className="rounded-circle bg-white shadow d-flex align-items-center justify-content-center mx-auto"
                style={{ width: "120px", height: "120px", transition: "0.3s" }}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{ width: "65%", height: "65%", objectFit: "contain" }}
                />
              </div>
              <p className="mt-3 fw-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialists Doctors */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Top Doctors</h2>

        <div className="row g-4">
          {loading && <p className="text-center">Loading top doctors...</p>}

          {error && <p className="text-danger text-center">{error}</p>}

          {!loading &&
            !error &&
            doctors.map((doc) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={doc._id}>
                <div
                  className="card h-100 border border-5 border-light shadow-sm"
                  style={{ transition: "0.3s", borderRadius: "15px" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  <img
                    src={doc.image}
                    className="card-img-top border-0"
                    alt={doc.name}
                    style={{
                      height: "180px", // smaller image
                      width: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      padding: "10px",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{doc.name}</h5>
                    <p className="text-muted mb-1">{doc.speciality}</p>
                    <p className="text-muted mb-1">{doc.qualification}</p>
                    <p className="text-muted small">
                      Experience: {doc.experience} Years
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
