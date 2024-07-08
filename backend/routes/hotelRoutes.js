const express = require("express");
const {
  getHotels,
  addHotels,
  getHotelById,
  addRooms,
  deleteHotel,
  updateHotel,
} = require("../controller/hotelController");

const router = express.Router();

router.post("/", addHotels);
router.get("/", getHotels);
router.get("/:id", getHotelById);

router.delete("/:id", deleteHotel);
router.put("/:id", updateHotel);

// rooms
router.post("/:id/rooms", addRooms);

// router.post("/auth/register", registerUser);
// router.post("/auth/login", loginUser);
// router.post("/auth/sendOtp", sendOtp);
// router.get("/auth/verify/:token", verifyUser);
// // router.get("/", isAdmin, getAllUsers);
// // router.get("/", isLoggedIn, isAdmin, getAllUsers);
// router.get("/", requireLogin, getAllUsers);

module.exports = router;
