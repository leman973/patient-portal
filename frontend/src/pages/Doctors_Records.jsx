import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    specialist: "",
    qualification: "",
    experience: "",
    address: "",
  });

  // Fetch Doctors Records
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Doctor Record
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/doctors", formData);
      fetchDoctors();
      setFormData({
        name: "",
        mobile: "",
        specialist: "",
        qualification: "",
        experience: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Doctor Record
  const deleteDoctor = async () => {
    if (!selectedId) return alert("Select doctor to delete");

    try {
      await axios.delete(`http://localhost:8080/api/doctors/${selectedId}`);
      alert("Doctor record deleted successfully ✅");
      fetchDoctors();
      setSelectedId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-4 min-vh-100">
      <h2 className="text-center text-success fw-bold mb-4">
        Doctor Management Panel
      </h2>

      {/* Insertion of Doctor Records Form */}
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
                  type="text"
                  name="mobile"
                  placeholder="Mobile No"
                  className="form-control"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="specialist"
                  placeholder="Specialist"
                  className="form-control"
                  value={formData.specialist}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  className="form-control"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience (years)"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="btn btn-success mt-3 fw-bold">Add Doctor</button>
          </form>
        </div>
      </div>

      {/* Deletion of Doctor Records */}
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

      {/* Doctors List*/}
      <div className="card shadow">
        <div className="card-header bg-success text-white fw-bold">
          Doctors List
        </div>

        <div className="card-body table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Specialist</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc, index) => (
                <tr key={doc._id}>
                  <td>{index + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.mobile}</td>
                  <td>{doc.specialist}</td>
                  <td>{doc.qualification}</td>
                  <td>{doc.experience}</td>
                  <td>{doc.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
