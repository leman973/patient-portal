import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/myAppointments", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setAppointments(res.data);
        setLoader(false);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error(error);
          setLoader(false);
        }
      }
    }
    fetchAppointments();
  }, [navigate])

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/myAppointments/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(prev =>
        prev.map(appt =>
          appt._id === id ? { ...appt, status: "Cancelled" } : appt
        )
      );

    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Cancel failed", error);
        console.log(error.response.data.message);
        alert("Could not cancel appointment");
      }
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };


  const formatFees = (amount, currency) =>
    currency === "INR" ? `₹${amount}` : amount;

  const currentAppointments = appointments.filter(a => a.status === "Active");
  const pastAppointments = appointments.filter(a => a.status !== "Active");

  if (loader) {
    return <Loader></Loader>
  }

  if (currentAppointments.length === 0 && pastAppointments.length === 0) {
    return (
      <div className="container py-5">
        <h4 className="fw-bold text-center text-success">
          No Appointment Booked
        </h4>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <div className="container py-5 bg-light">
        <h2 className="text-center fw-bold mb-5">My Appointments</h2>

        {/* Current Appointments */}
        {currentAppointments.length > 0 && (<h4 className="fw-bold text-center text-success mb-4">
          Current Appointments
        </h4>)}

        {currentAppointments.map((appt) => (
          <div
            key={appt._id}
            className="card border-0 shadow-sm mb-4 rounded-4 appointment-card mx-auto"
            style={{ maxWidth: "900px" }}
          >
            <div className="card-body border border-2 border-black rounded-4">
              {/* Top Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-0 fw-bold">
                     {formatDate(appt.date)} • {appt.timeSlot}
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
                    <strong>Patient:</strong> {appt.user.name} (
                    {appt.user.age} yrs)
                  </p>
                  <p className="mb-0">
                    <strong>Fees:</strong>{" "}
                    {formatFees(appt.charge, appt.currency)}
                  </p>
                </div>

                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill px-4"
                    onClick={() => cancelAppointment(appt._id)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (<h4 className="fw-bold text-center text-primary mt-5 mb-4">
          Past Appointments
        </h4>)}

        {pastAppointments.map((appt) => (
          <div
            key={appt._id}
            className="card border-0 shadow-sm mb-4 rounded-4 appointment-card mx-auto"
            style={{ maxWidth: "900px" }}
          >
            <div className="card-body p-3 border border-2 border-black rounded-4">
              {/* Top Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-bold">
                   {formatDate(appt.date)} • {appt.timeSlot}
                </h6>
                <span
                  className={`badge px-3 py-2 rounded-pill ${appt.status === "Completed" ? "bg-success" : "bg-secondary"
                    }`}
                >
                  {appt.status === "Completed" ? "Completed" : "Cancelled"}
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
                <strong>Patient:</strong> {appt.user.name} (
                {appt.user.age} yrs)
              </p>
              <p className="mb-0">
                <strong>Fees:</strong> {formatFees(appt.charge, appt.currency)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
