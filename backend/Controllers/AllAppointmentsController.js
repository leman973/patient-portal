const Booking = require("../Models/Booking");

// GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Booking.find()
      .populate("user", "name phone age")
      .populate("doctor", "name speciality");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAppointment = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAppointments,
  updateAppointmentStatus,
};
