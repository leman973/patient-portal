import React, { useEffect, useState } from "react";
import doctors from "../data/doctors";
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from "react-router-dom";

const specialities = [
    "All Doctors",
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroentrologist"
];

const AllDoctors = () => {
    const [filteredDocs, setFilteredDocs] = useState(doctors);
    const [activeSpec, setActiveSpec] = useState("All Doctors");

    const { speciality } = useParams();
    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality == "All Doctors") {
            setFilteredDocs(doctors)
        }
        else if(speciality == null){
            setFilteredDocs(doctors)
        }
        else{
            setFilteredDocs(doctors.filter(doc => doc.speciality === speciality))
        }
    }

    useEffect(() => {
        applyFilter()
    }, [speciality])


    return (
        <section className="py-4 px-3">
            <div className="d-flex flex-column flex-md-row gap-4">

                {/* Specialities List */}
                <div className="bg-light p-3 rounded shadow-sm mx-auto" style={{ width: "350px", minWidth: "350px", maxWidth: "300px" }}>
                    <h6 className="fw-bold mb-3 text-success">Specialities</h6>

                    {specialities.map((spec, index) => (
                        <button
                            key={index}
                            className={`btn text-start mb-2 w-100 text-center ${activeSpec === spec ? "btn-success text-white" : "btn-outline-success"
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
                            <Card key={doc.id} className="w-100" style={{ maxWidth: "17rem" }}>
                                <div
                                    className="card border-0 shadow-sm text-center"
                                    style={{
                                        borderRadius: "15px",
                                        transition: "0.3s",
                                        overflow: "hidden"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                        e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                                    }}
                                >
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className="card-img-top"
                                        style={{
                                            height: "180px", // smaller image
                                            objectFit: "cover",
                                            borderTopLeftRadius: "15px",
                                            borderTopRightRadius: "15px",
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
                                            onClick={() => navigate(`/bookings/${doc.id}`)}
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
