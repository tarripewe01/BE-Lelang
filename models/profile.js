const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      type: String,
      required: true,
    },
    no_ktp: {
      type: Number,
      required: true,
    },
    no_npwp: {
      type: Number,
    },
    bank: {
      type: String,
      enum: ["BCA", "BNI", "BRI", "BTN", "Mandiri"],
    },
    no_rekening: {
      type: Number,
      required: true,
    },
    photo_path: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", ProfileSchema);
