import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import doctors from "../data/doctors";

const Booking = () => {
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

    const slots = generateNextDays(7);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState("Morning");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);

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

    const batches = {
        Morning: generateSlots(9, "AM"),
        Afternoon: generateSlots(2, "PM"),
        Evening: generateSlots(5, "PM"),
    };

    const filteredDoctors = selectedSpeciality
        ? doctors.filter(doc => doc.speciality === selectedSpeciality)
        : [];
    const doctorsToShow = selectedDoc ? [selectedDoc] : filteredDoctors;

    return (
        <div className='container my-3'>
            {/* User Info Card */}
            <h4 className="mb-3">Your Info</h4>
            <div className="d-flex flex-wrap align-items-center justify-content-between p-3 border rounded shadow-sm mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                        style={{ width: "55px", height: "55px" }}>
                        <FaUser size={24} />
                    </div>
                    <div>
                        <h6 className="mb-1 fw-bold">John Doe, <span className="text-muted">23, Male</span></h6>
                        <small className="text-muted">+1 345 678 901</small>
                    </div>
                </div>
                <Button variant="outline-danger" size="sm">Edit Profile</Button>
            </div>

            {/* Date Selection */}
            <h4 className="mb-3">Select Date</h4>
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

            {/* Time Batches */}
            <h4 className="mb-3">Select Time</h4>
            <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
                {Object.keys(batches).map((batch) => (
                    <Button
                        key={batch}
                        onClick={() => { setSelectedBatch(batch); setSelectedTimeSlot(null); }}
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

            {/* Speciality Selection */}
            <h4 className="mb-3">Select Speciality</h4>
            <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start">
                {specialities.map((spec, index) => (
                    <Button
                        key={index}
                        variant={selectedSpeciality === spec ? "primary" : "outline-primary"}
                        className='px-3 py-2 rounded-pill'
                        style={{ minWidth: "150px" }}
                        onClick={() => { setSelectedSpeciality(spec); setSelectedDoc(null); }}
                    >
                        {spec}
                    </Button>
                ))}
            </div>

            {/* Doctors List */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start mb-4">
                {filteredDoctors.length === 0 && selectedSpeciality && (
                    <p className="text-muted w-100 text-center">No doctors available for this speciality</p>
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
