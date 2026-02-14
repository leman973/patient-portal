const userModel = require("../Models/User");
const Doctor = require("../Models/Doctor");
const Booking = require("../Models/Booking")

const getUserDetail = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User Not Found" });
        res.json({id: user._id, name: user.name, age: user.age, avatar: user.avatar, phone: user.phone })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const addBooking = async (req, res) => {
    try {
        const { user, doctor, speciality, batch, date, timeSlot, charge } = req.body;

        if (!user || !doctor || !speciality || !batch || !date || !timeSlot) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const doctorExists = await Doctor.findById(doctor);
        if (!doctorExists) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const userExists = await userModel.findById(user);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        //Prevent double booking for same doctor, date, and time slot
        const existingBooking = await Booking.findOne({
            doctor,
            date: new Date(date),
            timeSlot
        });

        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked" });
        }

        const newBooking = new Booking({
            user,
            doctor,
            speciality,
            batch,
            date: new Date(date),
            timeSlot,
            charge
        });

        await newBooking.save();

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getUserDetail,
    addBooking
};