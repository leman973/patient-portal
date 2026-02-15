const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/mongoDB");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
const BookingRouter = require("./Routes/BookingRouter");
const userDetailsRouter = require("./Routes/userDetailsRouter");
const profileRouter = require("./Routes/profileRouter");
const ContactRouter = require("./Routes/ContactRouter");
const connectCloudinary = require("./config/cloudinary");
const doctorRoutes = require("./Routes/AdminDoctorRoutes");
const doctorUserRoute = require("./Routes/DoctorDetailRouter");
const myAppointments = require("./Routes/MyAppointments");
const allDoctorRoutes = require("./Routes/AllDoctorRoutes");
const adminAllAppointments = require("./Routes/AllAppointmentsRoutes");

const errorHandler = require("./Middlewares/errorHandler");

const PORT = process.env.PORT || 8080;
connectDB();
connectCloudinary();

app.use(bodyParser.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.onrender.com"
  ],
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/me", userDetailsRouter);
app.use("/api/profile", profileRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/appt-doctors", doctorUserRoute);
app.use("/api/admin/doctors", doctorRoutes);
app.use("/api/myAppointments", myAppointments);
app.use("/api/doctors", allDoctorRoutes);
app.use("/api/admin", adminAllAppointments);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
