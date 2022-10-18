const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    user_path: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
