const express = require("express");
const router = express.Router();
const Doctor = require("../Models/Doctor");
const ensureAuthenticated = require("../Middlewares/Auth");
const upload = require("../Middlewares/mutler");
const cloudinary = require("../config/cloudinary");
const { addDoctor, getDoctors, deleteDoctor } = require("../Controllers/AdminDoctorController");

router.get("/",ensureAuthenticated,getDoctors);

router.post("/",ensureAuthenticated,upload.single("image"), addDoctor);

// Deleting a doctor record
router.delete("/:id",ensureAuthenticated,deleteDoctor);

module.exports = router;
