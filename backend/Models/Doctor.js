const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    specialist: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

module.exports = doctorModel;
