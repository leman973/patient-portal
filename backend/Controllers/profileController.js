const userModel = require("../Models/User");
const cloudinary = require("cloudinary").v2;

const getUserDetail = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, age, gender, phone } = req.body;
        const updateData = { name, age, gender, phone };

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "avatars",
                transformation: [
                    { width: 500, height: 500, crop: "limit" },
                    { quality: "auto" } 
                ]
            });

            updateData.avatar = result.secure_url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

module.exports = {
    getUserDetail,
    updateProfile,
};

