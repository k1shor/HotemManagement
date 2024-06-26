const express = require("express");
const {
  registerUser,
  loginUser,

  verifyUser,
  sendOtp,
  getAllUsers,
  getSingleUser,

  forgotPassword,
  resetPassword,
  // sendOTP,
} = require("../controller/userController");

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/sendOtp", sendOtp);
router.get("/auth/verify/:token", verifyUser);
router.get("/", getAllUsers);

router.get("/:id", getSingleUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
