const Doctor = require("../Models/Doctor");

const getTopDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.aggregate([
      {
        $sort: { experience: -1 },
      },
      {
        $group: {
          _id: "$speciality",
          doctor: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$doctor" },
      },
    ]);

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching top doctors",
      error: error.message,
    });
  }
};

module.exports = { getTopDoctors };
