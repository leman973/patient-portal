const express = require("express");
const router = express.Router();
const Doctor = require("../Models/Doctor");
const upload = require("../Middlewares/mutler");
const cloudinary = require("../config/cloudinary");

// Fetching deatils of all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// Adding a new doctor record
router.post("/", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor" });
  }
});

// Deleting a doctor record
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor" });
  }
});

module.exports = router;
