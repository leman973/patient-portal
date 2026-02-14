const Doctor = require("../Models/Doctor");

const getDoctorsBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.query;

    let doctors;

    if (!speciality || speciality === "All Doctors") {
      doctors = await Doctor.find();
    } else {
      doctors = await Doctor.find({
        speciality: { $regex: speciality, $options: "i" },
      });
    }

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctorsBySpeciality,
};
