const express = require("express");
const router = express.Router();

const { getTopDoctors } = require("../Controllers/TopDoctorController");

router.get("/top", getTopDoctors);

module.exports = router;
