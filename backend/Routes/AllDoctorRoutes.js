const express = require("express");
const router = express.Router();

const {
  getDoctorsBySpeciality,
} = require("../Controllers/AllDoctorController");

// GET doctors according to speciality
router.get("/", getDoctorsBySpeciality);

module.exports = router;
