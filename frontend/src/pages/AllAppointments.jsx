import React, { useState } from "react";

const AllAppointmentsAdmin = () => {
  // Admin sees ALL appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2026-02-10",
      time: "11:30 AM",
      patient: { name: "Ramesh Kumar", age: 30, phone: "9876543210" },
      doctor: { name: "Dr. Rahul Sharma", speciality: "Neurologist" },
      fees: 500,
      currency: "INR",
      status: "active",
    },
    {
      id: 2,
      date: "2026-01-25",
      time: "4:00 PM",
      patient: { name: "Priya Singh", age: 42, phone: "9123456780" },
      doctor: { name: "Dr. Sneha Patil", speciality: "Cardiologist" },
      fees: 600,
      currency: "INR",
      status: "completed",
    },
    {
      id: 3,
      date: "2026-01-15",
      time: "10:00 AM",
      patient: { name: "Amit Shah", age: 35, phone: "9988776655" },
      doctor: { name: "Dr. Amit Deshmukh", speciality: "General Physician" },
      fees: 400,
      currency: "INR",
      status: "cancelled",
    },
  ]);

  const formatFees = (amount, currency) =>
    currency === "INR" ? `₹${amount}` : amount;

  // Admin changes appointment status
  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updated);
  };

  const getBadgeColor = (status) => {
    if (status === "active") return "bg-warning";
    if (status === "completed") return "bg-success";
    if (status === "cancelled") return "bg-danger";
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Admin - All Appointments</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Fees</th>
              <th>Status</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>
                  {appt.date} <br />
                  <small>{appt.time}</small>
                </td>

                <td>
                  <strong>{appt.patient.name}</strong>
                  <br />
                  <small>Age: {appt.patient.age}</small>
                  <br />
                  <small>📞 {appt.patient.phone}</small>
                </td>

                <td>{appt.doctor.name}</td>
                <td>{appt.doctor.speciality}</td>

                <td>{formatFees(appt.fees, appt.currency)}</td>

                <td>
                  <span className={`badge ${getBadgeColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateStatus(appt.id, "completed")}
                    >
                      Complete
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(appt.id, "cancelled")}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => updateStatus(appt.id, "active")}
                    >
                      Activate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointmentsAdmin;
