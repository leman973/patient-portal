const userModel = require("../Models/User");

const getUserDetail = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if(!user) return res.status(404).json({message: "User Not Found"});
        res.json({name:user.name, age:user.age, avatar: user.avatar,phone:user.phone})
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = getUserDetail;