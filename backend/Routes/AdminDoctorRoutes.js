const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../Middlewares/Auth");
const upload = require("../Middlewares/mutler");
const { addDoctor, getDoctors, deleteDoctor } = require("../Controllers/AdminDoctorController");
const adminAcessOnly = require("../Middlewares/adminAccessOnly");

router.get("/",ensureAuthenticated,adminAcessOnly,getDoctors);

router.post("/",ensureAuthenticated,adminAcessOnly,upload.single("image"), addDoctor);

router.delete("/:id",ensureAuthenticated,adminAcessOnly,deleteDoctor);

module.exports = router;
