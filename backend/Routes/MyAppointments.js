const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../Middlewares/Auth");
const {getUserAppointments, cancelAppointment} = require("../Controllers/MyAppointments");

router.get("/",ensureAuthenticated,getUserAppointments);

router.put("/:id", ensureAuthenticated, cancelAppointment);

module.exports = router;