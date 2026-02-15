import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const specialities = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroentrologist",
];

export default function DoctorManagement() {
  const navigate = useNavigate();
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [doctors, setDoctors] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    speciality: "",
    qualification: "",
    experience: "",
    charge: "",
    batch: [],
    image: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDoctors(token);
  }, []);

  const fetchDoctors = async (token) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctors(res.data);
      setLoading(false);
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        localStorage.removeItem("token");

        navigate("/login", {
          state: { error: err.response.data.message },
        });
      } else {
        console.error(err);
        setLoading(false);
      }
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Batch Selection
  const handleBatchChange = (value) => {
    if (formData.batch.includes(value)) {
      setFormData({
        ...formData,
        batch: formData.batch.filter((b) => b !== value),
      });
    } else {
      setFormData({
        ...formData,
        batch: [...formData.batch, value],
      });
    }
  };

  // Add Doctor
  const addDoctor = async (e) => {
    e.preventDefault();
    setAddLoading(true);

    try {
      const token = localStorage.getItem("token");

      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("speciality", formData.speciality);
      dataToSend.append("qualification", formData.qualification);
      dataToSend.append("experience", Number(formData.experience));
      dataToSend.append("charge", Number(formData.charge));
      formData.batch.forEach((b) => dataToSend.append("batch", b));
      if (formData.image) dataToSend.append("image", formData.image);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Doctor Added Successfully ");
      fetchDoctors(token);

      setFormData({
        name: "",
        email: "",
        speciality: "",
        qualification: "",
        experience: "",
        charge: "",
        batch: [],
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        localStorage.removeItem("token");
        navigate("/login", {
          state: { error: err.response.data.message || "Access Denied" },
        });
      } else {
        alert("Error adding doctor");
      }
    } finally {
      setAddLoading(false);
    }
  };


  // Delete Doctor
  const deleteDoctor = async () => {
    if (!selectedId) return alert("Select Doctor");

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/doctors/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Doctor Deleted");
      fetchDoctors(token);
      setSelectedId("");
    } catch (err) {
      console.error(err);

      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        localStorage.removeItem("token");

        navigate("/login", {
          state: { error: err.response.data.message },
        });
      } else {
        alert("Error deleting doctor");
      }
    }

  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="container py-4 min-vh-100">
      <h2 className="text-center text-success fw-bold mb-4">
        Doctor Management Panel
      </h2>

      {/* ADD DOCTOR */}
      <div className="card shadow mb-4 border-success">
        <div className="card-header bg-success text-white fw-bold">
          Add Doctor
        </div>

        <div className="card-body">
          <form onSubmit={addDoctor}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Doctor Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* SPECIALITY DROPDOWN */}
              <div className="col-md-4">
                <select
                  name="speciality"
                  className="form-control"
                  value={formData.speciality}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Speciality</option>
                  {specialities.map((spec, i) => (
                    <option key={i} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  className="form-control"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (Years)"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="number"
                  name="charge"
                  placeholder="Consultation Fee ₹"
                  className="form-control"
                  value={formData.charge}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BATCH CHECKBOX */}
              <div className="col-md-6">
                <label className="fw-bold">Available Batch:</label>

                {["Morning", "Afternoon", "Evening"].map((b) => (
                  <div className="form-check" key={b}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.batch.includes(b)}
                      onChange={() => handleBatchChange(b)}
                    />
                    <label className="form-check-label">{b}</label>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setFormData({ ...formData, image: file });
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {preview && (
                  <div className="mt-3">
                    <p className="fw-bold">Image Preview:</p>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <button className="btn btn-success mt-3 fw-bold" type="submit">
              {addLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding...
                </>
              ) : (
                "Add Doctor"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* DELETE */}
      <div className="card shadow mb-4 border-primary">
        <div className="card-header bg-primary text-white fw-bold">
          Delete Doctor
        </div>

        <div className="card-body d-flex gap-3">
          <select
            className="form-select w-50"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>

          <button className="btn btn-danger fw-bold" onClick={deleteDoctor}>
            Delete
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="card shadow">
        <div className="card-header bg-success text-white fw-bold">
          Doctors List
        </div>

        <div className="card-body table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Speciality</th>
                <th>Experience</th>
                <th>Charge</th>
                <th>Batch</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc, i) => (
                <tr key={doc._id}>
                  <td>{i + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.speciality}</td>
                  <td>{doc.experience} yrs</td>
                  <td>₹{doc.charge}</td>
                  <td>{doc.batch.join(", ")}</td>
                  <td>{doc.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
