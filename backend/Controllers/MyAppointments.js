const Booking = require("../Models/Booking")
const userModel = require("../Models/User");
const Doctor = require("../Models/Doctor");

const getUserAppointments = async (req, res) => {
    try {
        const userId = req.userId;

        const appointments = await Booking.find({ user: userId })
            .populate("doctor", "name speciality")
            .populate("user", "name age");

        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this user" });
        }

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userId = req.userId; 

    const appointment = await Booking.findOne({
      _id: appointmentId,
      user: userId
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    appointment.status = "Cancelled";
    appointment.updatedAt = Date.now();

    await appointment.save();

    res.json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {getUserAppointments, cancelAppointment};
