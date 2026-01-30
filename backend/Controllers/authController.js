const userModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "User already exist, you can login", success: false })
        }
        const usermodel = new userModel({ name, email, password });
        usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();
        res.status(201)
            .json({ message: "Signup successful", success: true })
    } catch (error) {
        console.log("Signup error:", error);
        res.status(500)
            .json({ message: "Internal Server error", success: false })

    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errorMsg = "Auth failed email or password is wrong";
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }

        const jwtToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (error) {
        console.log("Signup error:", error);
        res.status(500)
            .json({ message: "Internal Server error", success: false })

    }
}

module.exports = {
    signup,
    login
}