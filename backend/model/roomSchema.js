const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
      enum: ["available", "booked", "checked"],
      default: "available",
    },
    roomCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomCategory",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

// admin change status of booking
// usper admin -> add hotel
