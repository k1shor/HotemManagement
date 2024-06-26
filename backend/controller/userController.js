const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const OTP = require("../model/otpSchema");
const otpSchema = require("../model/otpSchema");

const generateOTP = async (email) => {
  let token = await OTP.create({
    otp: crypto.randomBytes(16).toString("hex"),
    email: email,
  });
  return token.otp;
};

// console.log(generateOTP());

/********************************************
 *      @description register User
 *      @route       POST /api/v1/auth/register
 *      @access      Public
 *      @param       {name, email, password, phoneNumber}
 *      @method POST
 /********************************************/

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password) {
    throw new ErrorResponse("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorResponse("User already exist", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
  });

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

/********************************************
 *      @description login User
 *      @route       POST /api/v1/auth/login
 *      @access      Public
 *      @param       {email, password}
 *      @method     POST
 * ********************************************/

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorResponse("All fields are required", 400);
  }

  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new ErrorResponse("Invalid credentials", 400);
  }
  if (!(await user.matchPassword(password))) {
    throw new ErrorResponse("Invalid credentials", 400);
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );

  user.password = undefined;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("token", token, options).status(200).json({
    success: true,
    msg: "Login success",
    user,
    token,
  });
});

/********************************************
 *     @description Verfify User
 *   @route       POST /api/v1/auth/verify
 *  @access      Private
 * ********************************************/
exports.sendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const otp = await generateOTP(email);

  if (!email) {
    throw new ErrorResponse("Enter email", 400);
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }

  console.log(otp);
  const URL = `http://localhost:4000/api/v1/user/auth/verify/${otp}`;

  mailSender({
    email,
    title: "OTP Verification: </br>",
    body: `Your OTP is ${otp}. Please do not share it with anyone. <a href=${URL}>Click here to verify</a>`,
  });

  return res.status(200).json({
    success: true,
    msg: "OTP sent successfully to email",
  });
});

/********************************************
 *      @description verify User
 *      @route       POST /api/v1/auth/verify
 *      @access      Private
 * ********************************************/

exports.verifyUser = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const dbOtp = await OTP.findOne({ otp: token });

  const user = await User.findOne({
    email: dbOtp.email,
  });

  user.isVerified = true;

  await user.save();

  res.status(200).json({
    success: true,
    msg: "OTP verified successfully",
    dbOtp,
  });
});

/********************************************
 *     @description Get all User
 *  @route       GET /api/v1/auth/users
 * @access      Public
 * ********************************************/

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    numberOfUsers: users.length,
    data: users,
  });
});

/********************************************
 *    @description Get single User
 * @route       GET /api/v1/auth/user/:id
 * @access      Public
 * ********************************************/

exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/********************************************
 * @description Reset Password Token
 * @route       POST /api/v1/auth/resetPasswordToken
 * @access      Private
 ********************************************/

exports.resetPasswordToken = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }

  const token = await generateOTP(email);
});
