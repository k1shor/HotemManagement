const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../model/userSchema");
const RoomCategory = require("../model/roomCategorySchema");
const Hotel = require("../model/hotelSchema");
const Room = require("../model/roomSchema");

/********************************************
 *      @description register User
 *      @route       POST /api/v1/auth/register
 *      @access      Public
 *      @param       {name, email, password, phoneNumber}
 *      @method POST
 /********************************************/

exports.addHotels = asyncHandler(async (req, res, next) => {
  const { hotelName, description, address, phone, category, rooms } = req.body;

  // if (!hotelName || !description || !address || !phone || !category) {
  //   return next(new ErrorResponse("Please fill all the fields", 400));
  // }
  console.log(req.files);

  console.log(req.body, "afasfasfdsa");

  console.log(hotelName, description, address, phone, category, rooms);
  // console.log("88242342342342342");
  // const { name, price } = req.body.roomCategory;

  // const { roomNumber, availability } = req.body.rooms;

  // const createdRoomCategory = await RoomCategory.create({
  //   name,
  //   price,
  // });

  // const createdRoom = await Room.create({
  //   roomNumber,
  //   availability,
  //   roomCategory: createdRoomCategory._id,
  // });
  const hotels = await Hotel.create({
    hotelName,
    description,
    address,
    phone,
    category,
    image: req.file?.path,
    // rooms: createdRoom._id,
    // roomCategory: createdRoomCategory._id,
  });

  res.status(200).json({
    success: true,
    message: "All Hotels",
    hotels,
  });
});

/********************************************
 *     @description get all Hotels
 *    @route       GET /api/v1/hotels
 *   @access      Public
 *   @method GET
 * ********************************************/

exports.getHotels = asyncHandler(async (req, res, next) => {
  const hotels = await Hotel.find().populate("rooms roomCategory");

  res.status(200).json({
    success: true,
    message: "All Hotels",
    length: hotels.length,
    hotels,
  });
});

/********************************************
 *    @description get Hotel by id
 *   @route       GET /api/v1/hotels/:id
 * @access      Public
 * @method GET
 * ********************************************/
exports.getHotelById = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id).populate(
    "rooms roomCategory"
  );

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Hotel",
    hotel,
  });
});

/********************************************
 *   @description update Hotel by id
 *  @route       PUT /api/v1/hotels/:id
 * @access      Public
 * @method PUT
 * ********************************************/
exports.updateHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(
    // req.params.id,
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Hotel updated",
    hotel,
  });
});

/********************************************
 *  @description delete Hotel by id
 * @route       DELETE /api/v1/hotels/:id
 * @access      Public
 * @method DELETE
 * ********************************************/

exports.deleteHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Hotel deleted",
  });
});

/********************************************
 *   @description get rooms
 *    @route        /api/v1/hotels/:id/rooms
 *  @access      Public
 * @method POST
 *
 *******************************************/

exports.addRooms = asyncHandler(async (req, res, next) => {
  const { roomNumber, availability } = req.body;

  const { name, price } = req.body.roomCategory;

  const createdRoomCategory = await RoomCategory.create({
    name,
    price,
  });

  const room = await Room.create({
    roomNumber,
    availability,
    // hotel: req.params.id,
    roomCategory: createdRoomCategory._id,
  });

  await Hotel.findByIdAndUpdate(req.params.id, {
    $push: { rooms: room._id },
  });

  res.status(200).json({
    success: true,
    message: "Room added",
    room,
  });
});
