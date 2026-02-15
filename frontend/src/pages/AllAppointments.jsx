import React, { useState, useEffect } from "react";
import axios from "axios";

const AllAppointmentsAdmin = () => {
  // Admin sees ALL appointments
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/admin/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAppointments(response.data);
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  };

  const formatFees = (amount, currency) =>
    currency === "INR" ? `₹${amount}` : amount;

  // Admin changes appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/admin/appointments/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // After updating in DB → refresh list
      fetchAppointments();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const getBadgeColor = (status) => {
    if (status === "Active") return "bg-warning";
    if (status === "Completed") return "bg-success";
    if (status === "Cancelled") return "bg-danger";
    return "bg-secondary";
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
              <tr key={appt._id}>
                <td>
                  {new Date(appt.date).toLocaleDateString()}
                  <br />
                  <small>{appt.timeSlot}</small>
                </td>

                <td>
                  <strong>{appt.user?.name}</strong>
                  <br />
                  <small>Age: {appt.user?.age || "N/A"}</small>
                  <br />
                  <small>📞 {appt.user?.phone}</small>
                </td>

                <td>{appt.doctor?.name}</td>
                <td>{appt.speciality}</td>

                <td>₹{appt.charge}</td>

                <td>
                  <span className={`badge ${getBadgeColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => updateStatus(appt._id, "Completed")}
                    >
                      Complete
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(appt._id, "Cancelled")}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => updateStatus(appt._id, "Active")}
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
