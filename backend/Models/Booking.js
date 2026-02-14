const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",   
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", 
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String, 
        required: true
    },
    charge: {
        type: Number, 
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Cancelled", "Completed"],
        default: "Active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


bookingSchema.pre("save", async function() {
    this.updatedAt = Date.now();
});


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
