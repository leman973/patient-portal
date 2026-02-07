import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Loader from '../Components/Loader';
import Spinner from "react-bootstrap/Spinner";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        phone: "",
        avatar: null,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get("http://localhost:8080/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                setFormData({
                    name: res.data.name || "",
                    gender: res.data.gender || "",
                    age: res.data.age || "",
                    phone: res.data.phone || "",
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            const token = localStorage.getItem('token');
            const dataToSend = new FormData();
            dataToSend.append("name", formData.name);
            dataToSend.append("age", formData.age);
            dataToSend.append("gender", formData.gender);
            dataToSend.append("phone", formData.phone);
            if (formData.avatar) {
                dataToSend.append("avatar", formData.avatar);
            }
            const res = await axios.put("http://localhost:8080/api/profile", dataToSend, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
            setEditLoading(false);
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (error) {
            setEditLoading(false);
            console.error(error);
            alert("Failed to update profile");
        }
    }

    if (loading) return <Loader />;
    if (!user) return <p>No user found.</p>;

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow-sm border p-4 w-100" style={{ maxWidth: "680px" }}>
                <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                    <div className='d-flex align-items-center flex-wrap gap-4'>
                        <div className='position-relative d-inline-block'>
                            {formData.avatar ? (
                                <img src={URL.createObjectURL(formData.avatar)} alt="Preview" className="rounded-circle"
                                    style={{ width: "120px", height: "120px", objectFit: "cover", cursor: editMode ? "pointer" : "default" }} />
                            ) : user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: "120px", height: "120px", objectFit: "cover", cursor: editMode ? "pointer" : "default" }}
                                />) : (
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center bg-light border"
                                    style={{ width: "110px", height: "110px", cursor: editMode ? "pointer" : "default" }}
                                >
                                    <FaUser size={40} />
                                </div>)}

                            {editMode && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: "#0d6efd", // Bootstrap primary color
                                        color: "white",
                                        borderRadius: "50%",
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        border: "2px solid white",
                                    }}
                                    onClick={() => document.getElementById("avatarInput").click()}
                                >
                                    ✎
                                </div>
                            )}

                            {/* Hidden file input */}
                            <input
                                type="file"
                                id="avatarInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                            />
                        </div>

                        <div>
                            {editMode ? (
                                <div className='d-flex gap-2 align-items-center'>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control mb-1"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : (
                                <h5 className="mb-1 fw-semibold">{user.name}</h5>
                            )}

                            <p className={`text-muted mb-0 ${editMode ? "d-none" : ""}`}>
                                {user.gender} · {user.age} years
                            </p>
                        </div>
                    </div>

                    {editMode ? (
                        <div className="d-flex gap-2">
                            <button className='btn btn-primary btn-sm' onClick={handleSubmit}>{editLoading ? (<><span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                                Saving...</>) : ("Save")}</button>
                            <button className='btn btn-secondary btn-sm' onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button className='btn btn-outline-primary btn-sm' onClick={() => setEditMode(true)}>Edit</button>
                    )}
                </div>

                <hr />

                <div className="d-flex flex-wrap gap-4">
                    <div className="d-flex flex-column p-2 gap-2" style={{ flex: "1 1 0", minWidth: "200px" }}>
                        <h6 className="text-uppercase text-muted mb-2">
                            Basic Information
                        </h6>
                        {editMode ? (
                            <>
                                <div className='d-flex gap-2 align-items-center'>
                                    <label htmlFor="age"><strong>Age:</strong></label>
                                    <input
                                        id='age'
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Age"
                                    />
                                </div>
                                <div className='d-flex gap-2 align-items-center'>
                                    <label htmlFor="gender"><strong>Gender:</strong></label>
                                    <select
                                        id='gender'
                                        className="form-select"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="mb-1"><strong>Age:</strong> {user.age}</p>
                                <p className="mb-1"><strong>Gender:</strong> {user.gender}</p>
                            </>
                        )}
                    </div>

                    <div className="d-flex flex-column p-2 gap-2" style={{ flex: "1 1 0", minWidth: "200px" }} >
                        <h6 className="text-uppercase text-muted mb-2">
                            Contact Information
                        </h6>
                        {editMode ? (
                            <div className='d-flex gap-2 align-items-center'>
                                <label htmlFor="phone"><strong>Phone:</strong></label>
                                <input
                                    id='phone'
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                />
                            </div>

                        ) : (
                            <p className="mb-1"><strong>Mobile:</strong> {user.phone}</p>
                        )}
                        <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
