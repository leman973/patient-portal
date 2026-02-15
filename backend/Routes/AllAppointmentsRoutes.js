const express = require("express");
const router = express.Router();

const {
  getAllAppointments,
  updateAppointmentStatus,
} = require("../Controllers/AllAppointmentsController");

const authMiddleware = require("../Middlewares/Auth");
const adminAccessOnly = require("../Middlewares/adminAccessOnly");

// GET ALL APPOINTMENTS
router.get(
  "/appointments",
  authMiddleware,
  adminAccessOnly,
  getAllAppointments,
);

// UPDATE APPOINTMENT STATUS
router.put(
  "/appointments/:id",
  authMiddleware,
  adminAccessOnly,
  updateAppointmentStatus,
);

module.exports = router;
