const express = require("express");
const {
  getHotels,
  addHotels,
  getHotelById,
  addRooms,
  deleteHotel,
  updateHotel,
} = require("../controller/hotelController");
const upload = require("./uploadRoutes");

const router = express.Router();

router.post("/", upload.single("image"), addHotels);
router.get("/", getHotels);
router.get("/:id", getHotelById);

router.delete("/:id", deleteHotel);
router.put("/:id", updateHotel);

// rooms
router.post("/:id/rooms", addRooms);

module.exports = router;
