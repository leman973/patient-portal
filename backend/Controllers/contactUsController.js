const contactModel = require("../Models/Contact");

const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ message: "All fields are required", success: false, })
        }

        await contactModel.create({ name, email, phone, subject, message, });

        return res.status(201).json({ success: true, message: "Data sent successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
}

module.exports = { submitContactForm };