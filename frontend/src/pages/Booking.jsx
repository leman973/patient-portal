import axios from "axios";
import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import doctors from "../data/doctors";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Booking = () => {
    const navigate = useNavigate();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const specialities = [
        "General Physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatrician",
        "Neurologist",
        "Gastroentrologist"
    ];


    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState("Morning");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const doctor = doctors.find(doc => doc.id === Number(id));

    useEffect(() => {
        if (doctor?.batch?.length) {
            setSelectedBatch(doctor.batch[0]);
            setSelectedSpeciality(doctor.speciality)
            setSelectedDoc(doctor)
        }
    }, [doctor]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/bookings", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    navigate("/login"); 
                } else {
                    console.error(err);
                    setLoading(false);
                }
            }
        }
        fetchUser();
    }, []);

    // Generate next N days
    function generateNextDays(n) {
        const slots = [];
        for (let i = 0; i < n; i++) {
            const today = new Date();
            today.setDate(today.getDate() + i);
            slots.push({
                dayName: daysOfWeek[today.getDay()],
                date: today.getDate(),
                monthName: monthsOfYear[today.getMonth()],
                year: today.getFullYear()
            });
        }
        return slots;
    }

    // Generate time slots
    const generateSlots = (startHour, period) => {
        const slots = [];
        let hour = startHour;
        let minute = 0;
        for (let i = 0; i < 5; i++) {
            const start = `${hour}:${minute === 0 ? "00" : minute}`;
            slots.push(`${start} ${period}`);
            minute += 30;
            if (minute === 60) {
                hour++;
                minute = 0;
            }
        }
        return slots;
    };

    const slots = generateNextDays(7);
    const batches = {
        Morning: generateSlots(9, "AM"),
        Afternoon: generateSlots(2, "PM"),
        Evening: generateSlots(5, "PM"),
    };

    const filteredDoctors = selectedSpeciality && selectedBatch
        ? doctors.filter(doc => (doc.speciality === selectedSpeciality && doc.batch.includes(selectedBatch)))
        : [];
    const doctorsToShow = selectedDoc ? [selectedDoc] : filteredDoctors;

    if (loading) return <Loader />;

    return (
        <div className='container my-3 d-flex flex-column justify-content-around'>
            {/* User Info Card */}
            <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-3 gap-lg-5 py-3 px-2 p-md-4 border rounded-4 shadow-sm bg-white mb-4'>
                <h4 className="mb-2 mb-lg-0">Your Info</h4>
                <div className="d-flex align-items-center justify-content-between p-3 border rounded shadow-sm mb-4 w-100">
                    <div className="d-flex align-items-center gap-3">
                        {user.avatar ? (<img
                            src={user.avatar}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: "55px", height: "55px", objectFit: "cover" }}
                        />) : (<div className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                            style={{ width: "55px", height: "55px" }}>
                            <FaUser size={24} />
                        </div>)}
                        <div>
                            <h6 className="mb-1 fw-bold">{user.name}, <span className="text-muted">{user.age}, {user.gender}</span></h6>
                            <small className="text-muted">{user.phone}</small>
                        </div>
                    </div>
                    <Button onClick={() => navigate("/profile")} variant="outline-danger" size="sm">Edit Profile</Button>
                </div>
            </div>

            {/* Date Selection */}
            <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-3 gap-lg-5 p-3 p-md-4 border rounded-4 shadow-sm bg-white mb-4'>
                <h4 className="mb-2 mb-lg-0">Select Date</h4>
                <div className='d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start mb-4'>
                    {slots.map((slot, index) => (
                        <Button
                            key={index}
                            onClick={() => setSelectedSlot(index)}
                            variant={selectedSlot === index ? "primary" : "outline-primary"}
                            className='px-3 py-2 rounded-pill fw-semibold shadow-sm'
                            style={{ minWidth: "120px" }}
                        >
                            <div style={{ fontSize: "0.85rem" }}>{slot.dayName}</div>
                            <div style={{ fontSize: "1rem", fontWeight: "600" }}>
                                {slot.date} {slot.monthName}
                            </div>
                        </Button>
                    ))}
                </div>
            </div>


            {/* Time Batches */}
            <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-3 gap-lg-5 p-3 p-md-4 border rounded-4 shadow-sm bg-white mb-4'>
                <h4 className="mb-2 mb-lg-0">Select Time</h4>
                <div>
                    <div className="d-flex flex-wrap gap-3   justify-content-center justify-content-md-start mb-3">
                        {Object.keys(batches).map((batch) => (
                            <Button
                                key={batch}
                                disabled={doctor ? !doctor.batch.includes(batch) : null}
                                onClick={() => { setSelectedBatch(batch); setSelectedTimeSlot(null); setSelectedDoc(null) }}
                                variant={selectedBatch === batch ? "primary" : "outline-primary"}
                                className='px-4 py-2 rounded-pill fw-semibold'
                                style={{ minWidth: "120px" }}
                            >
                                {batch}
                            </Button>
                        ))}
                    </div>


                    {/* Time Slots */}
                    <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
                        {batches[selectedBatch].map((slot, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedTimeSlot(slot)}
                                variant={selectedTimeSlot === slot ? "success" : "outline-success"}
                                className='px-3 py-2 rounded-3 fw-medium'
                                style={{ minWidth: "140px" }}
                            >
                                {slot}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Speciality Selection */}
            <div className='d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-3 gap-lg-5 p-3 p-md-4 border rounded-4 shadow-sm bg-white mb-4'>
                <h4 className="mb-3">Select Speciality</h4>
                <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start">
                    {specialities.map((spec, index) => (
                        <Button
                            key={index}
                            disabled={doctor ? doctor.speciality !== spec : null}
                            variant={selectedSpeciality === spec ? "primary" : "outline-primary"}
                            className='px-3 py-2 rounded-pill'
                            style={{ minWidth: "150px" }}
                            onClick={() => { setSelectedSpeciality(spec); setSelectedDoc(null); }}
                        >
                            {spec}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Doctors List */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start mb-4">
                {filteredDoctors.length === 0 && selectedSpeciality && (
                    <p className="text-muted w-100 text-center">No doctors available for this speciality and batch</p>
                )}
                {filteredDoctors.length === 0 && !selectedSpeciality && (
                    <p className="text-muted w-100 text-center">Select speciality to view available doctors</p>
                )}
                {doctorsToShow.map(doc => {
                    const isSelected = selectedDoc?.id === doc.id;
                    return (
                        <Card key={doc.id} className="shadow-sm" style={{ maxWidth: "17rem" }}>
                            <div
                                className={`card border-0 text-center ${isSelected ? "border border-3 border-success shadow-lg" : ""}`}
                                style={{ borderRadius: "15px", overflow: "hidden", transition: "0.3s" }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.15)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                                }}
                            >
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="card-img-top"
                                    style={{ height: "180px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column justify-content-center align-items-center p-3">
                                    <h5 className="fw-bold mb-1">{doc.name}</h5>
                                    <p className="text-muted mb-1">{doc.speciality}</p>
                                    <p className="text-muted mb-1">{doc.qualification}</p>
                                    <p className="text-muted mb-1 small">Experience: {doc.experience}</p>
                                    <p className="text-muted mb-1">Charge: {doc.charge}Rs</p>
                                    <Button
                                        variant={isSelected ? "success" : "outline-success"}
                                        onClick={() => setSelectedDoc(doc)}
                                    >
                                        {isSelected ? "Selected" : "Select"}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Book Appointment Button */}
            <div className="d-flex justify-content-center mb-5">
                <Button
                    variant="success"
                    size="lg"
                    disabled
                    style={{ minWidth: "220px", fontWeight: "600", padding: "10px 15px" }}
                >
                    Book Appointment
                </Button>
            </div>
        </div>
    )
}

export default Booking;
