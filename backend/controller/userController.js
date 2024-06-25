const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

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

  const user = await User.findOne({ email });
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
