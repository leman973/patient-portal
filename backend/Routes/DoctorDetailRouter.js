const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../Middlewares/Auth");
const getDoctorsDetails = require("../Controllers/DoctorDetailController");

router.get("/",ensureAuthenticated,getDoctorsDetails);

module.exports = router;