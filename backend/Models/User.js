const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["NORMAL", "ADMIN"],
        default: "NORMAL",
    },
    avatar: {
        type: String,
        default: "",
    },
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;