const userModel = require("../Models/User");

const userDetailFetch = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ name: user.name, email: user.email, avatar: user.avatar });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = userDetailFetch;