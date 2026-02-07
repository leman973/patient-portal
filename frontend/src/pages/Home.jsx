import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// images
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

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    speciality: "Cardiologist",
    experience: "12 Years",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    speciality: "Neurologist",
    experience: "9 Years",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
  },
  {
    id: 3,
    name: "Dr. Pooja Verma",
    speciality: "Dermatologist",
    experience: "7 Years",
    image:
      "https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function Home() {
  const navigate = useNavigate();

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
          {doctors.map((doc) => (
            <div className="col-md-4" key={doc.id}>
              <div
                className="card h-100 border-0 shadow-sm"
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
                  className="card-img-top"
                  alt={doc.name}
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{doc.name}</h5>
                  <p className="text-muted mb-1">{doc.speciality}</p>
                  <p className="text-muted small">
                    Experience: {doc.experience}
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
