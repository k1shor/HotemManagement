const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    // default: Date.now() + 60000,
    default: Date.now(), // 30 minutes from now
    expiresIn: Date.now() + 1800000,
  },
});

module.exports = mongoose.model("Otp", otpSchema);
