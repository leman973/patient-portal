const Doctor = require("../Models/Doctor");
const cloudinary = require("cloudinary").v2;

const addDoctor = async (req, res) => {
    try {
        const { name, email, speciality, qualification, experience, charge } = req.body;

        const batch = Array.isArray(req.body.batch)
            ? req.body.batch
            : req.body.batch
                ? [req.body.batch]
                : [];

        let imageUrl = "";

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "doctors",
                transformation: [
                    { width: 500, height: 500, crop: "limit" },
                    { quality: "auto" },
                    { fetch_format: "auto" },
                ],
            });

            imageUrl = result.secure_url;
        }

        const newDoctor = new Doctor({
            name,
            email,
            speciality,
            qualification,
            experience: Number(experience),
            charge: Number(charge),
            batch,
            image: imageUrl,
        });

        const savedDoctor = await newDoctor.save();

        res.status(201).json(savedDoctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding doctor" });
    }
};

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching doctors" });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting doctor" });
    }
};

module.exports = {
    addDoctor,
    getDoctors,
    deleteDoctor
}