import React from "react";

const MyAppointments = () => {
  // Dummy data
  const currentAppointments = [
    {
      id: 1,
      date: "2026-02-10",
      time: "11:30 AM",
      patient: {
        name: "Ramesh Kumar",
        age: 30,
      },
      doctor: {
        name: "Dr. Rahul Sharma",
        speciality: "Neurologist",
      },
      fees: 500,
      currency: "INR",
      status: "active",
    },
  ];

  const pastAppointments = [
    {
      id: 2,
      date: "2026-01-25",
      time: "4:00 PM",
      patient: {
        name: "Ramesh Kumar",
        age: 30,
      },
      doctor: {
        name: "Dr. Sneha Patil",
        speciality: "Cardiologist",
      },
      fees: 600,
      currency: "INR",
      status: "completed",
    },
    {
      id: 3,
      date: "2026-01-15",
      time: "10:00 AM",
      patient: {
        name: "Ramesh Kumar",
        age: 30,
      },
      doctor: {
        name: "Dr. Amit Deshmukh",
        speciality: "General Physician",
      },
      fees: 400,
      currency: "INR",
      status: "cancelled",
    },
  ];

  const formatFees = (amount, currency) =>
    currency === "INR" ? `₹${amount}` : amount;

  return (
    <div className="bg-light">
      <div className="container py-5 bg-light">
        <h2 className="text-center fw-bold mb-5">My Appointments</h2>

        {/* Current Appointments */}
        <h4 className="fw-bold text-center text-success mb-4">
          Current Appointments
        </h4>

        {currentAppointments.map((appt) => (
          <div
            key={appt.id}
            className="card border-0 shadow-sm mb-4 rounded-4 appointment-card mx-auto"
            style={{ maxWidth: "900px" }}
          >
            <div className="card-body border border-2 border-black rounded-4">
              {/* Top Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-0 fw-bold">
                    {appt.date} • {appt.time}
                  </h6>
                </div>
                <span className="badge bg-success px-3 py-2 rounded-pill">
                  Active
                </span>
              </div>

              <hr />

              {/* Doctor Information */}
              <div className="mb-3">
                <h5 className="fw-bold mb-1">{appt.doctor.name}</h5>
                <p className="text-muted mb-0">
                  Speciality: {appt.doctor.speciality}
                </p>
              </div>

              {/* Bottom Information */}
              <div className="row align-items-center">
                <div className="col-md-8">
                  <p className="mb-1">
                    <strong>Patient:</strong> {appt.patient.name} (
                    {appt.patient.age} yrs)
                  </p>
                  <p className="mb-0">
                    <strong>Fees:</strong>{" "}
                    {formatFees(appt.fees, appt.currency)}
                  </p>
                </div>

                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <button className="btn btn-outline-danger btn-sm rounded-pill px-4">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Past Appointments */}
        <h4 className="fw-bold text-center text-primary mt-5 mb-4">
          Past Appointments
        </h4>

        {pastAppointments.map((appt) => (
          <div
            key={appt.id}
            className="card border-0 shadow-sm mb-4 rounded-4 appointment-card mx-auto"
            style={{ maxWidth: "900px" }}
          >
            <div className="card-body p-3 border border-2 border-black rounded-4">
              {/* Top Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-bold">
                  {appt.date} • {appt.time}
                </h6>
                <span
                  className={`badge px-3 py-2 rounded-pill ${
                    appt.status === "completed" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {appt.status === "completed" ? "Completed" : "Cancelled"}
                </span>
              </div>

              <hr />

              {/* Doctor Info */}
              <div className="mb-3">
                <h5 className="fw-bold mb-1">{appt.doctor.name}</h5>
                <p className="text-muted mb-0">
                  Speciality: {appt.doctor.speciality}
                </p>
              </div>

              {/* Bottom Info */}
              <p className="mb-1">
                <strong>Patient:</strong> {appt.patient.name} (
                {appt.patient.age} yrs)
              </p>
              <p className="mb-0">
                <strong>Fees:</strong> {formatFees(appt.fees, appt.currency)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
