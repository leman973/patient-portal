const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    speciality: {
      type: String,
      required: true,
    },

    experience: {
      type: Number, 
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    charge: {
      type: Number,
      required: true,
    },

    batch: {
      type: [String],
      enum: ["Morning", "Afternoon", "Evening"],
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const doctorModel = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

module.exports = doctorModel;
