const Doctor = require("../Models/Doctor");

const getDoctorsDetails = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching doctors" });
    }
};

module.exports = getDoctorsDetails;