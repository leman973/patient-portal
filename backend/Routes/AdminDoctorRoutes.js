const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../Middlewares/Auth");
const upload = require("../Middlewares/mutler");
const { addDoctor, getDoctors, deleteDoctor } = require("../Controllers/AdminDoctorController");

router.get("/",ensureAuthenticated,getDoctors);

router.post("/",ensureAuthenticated,upload.single("image"), addDoctor);

router.delete("/:id",ensureAuthenticated,deleteDoctor);

module.exports = router;
