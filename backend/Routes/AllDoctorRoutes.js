const express = require("express");
const router = express.Router();

const {
  getDoctorsBySpeciality,
} = require("../Controllers/AllDoctorController");

const { getTopDoctors } = require("../Controllers/TopDoctorController");

router.get("/", getDoctorsBySpeciality);

router.get("/top", getTopDoctors)

module.exports = router;
