import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";

const specialities = [
  "All Doctors",
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroentrologist",
];

const AllDoctors = () => {
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [activeSpec, setActiveSpec] = useState("All Doctors");

  const { speciality } = useParams();
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/doctors`;

      if (speciality && speciality !== "All Doctors") {
        url += `?speciality=${speciality}`;
      }

      const response = await axios.get(url);
      setFilteredDocs(response.data);
      setLoader(false);
    } catch (error) {
      console.log("Error fetching doctors:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [speciality]);

  if (loader) {
    return <Loader></Loader>;
  }

  return (
    <section className="py-4 px-3">
      <div className="d-flex flex-column flex-md-row gap-4">
        {/* Specialities List */}
        <div
          className="bg-light p-3 rounded shadow-sm mx-auto"
          style={{ width: "350px", minWidth: "350px", maxWidth: "300px" }}
        >
          <h6 className="fw-bold mb-3 text-success">Specialities</h6>

          {specialities.map((spec, index) => (
            <button
              key={index}
              className={`btn text-start mb-2 w-100 text-center ${
                activeSpec === spec
                  ? "btn-success text-white"
                  : "btn-outline-success"
              }`}
              onClick={() => {
                setActiveSpec(spec);
                navigate(`/doctors/${spec}`);
              }}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Cards */}
        <div className="flex-grow-1">
          <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
            {filteredDocs.map((doc) => (
              <Card
                key={doc.id}
                className="w-100 border-0"
                style={{ maxWidth: "17rem" }}
              >
                <div
                  className="card shadow-sm text-center"
                  style={{
                    borderRadius: "15px",
                    transition: "0.3s",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 15px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="card-img-top"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                    }}
                  />

                  <div className="card-body d-flex flex-column justify-content-center align-items-center p-2">
                    <h5 className="fw-bold mb-1">{doc.name}</h5>
                    <p className="text-muted mb-1">{doc.speciality}</p>
                    <p className="text-muted mb-1">{doc.qualification}</p>
                    <p className="text-muted mb-1 small">
                      Experience: {doc.experience}
                    </p>

                    <button
                      className="btn btn-outline-success mt-2"
                      onClick={() => navigate(`/bookings/${doc._id}`)}
                    >
                      Schedule Appointment
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllDoctors;
