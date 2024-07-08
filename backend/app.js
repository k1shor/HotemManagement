require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const path = require("path");
const multer = require("multer");

const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

connectDB();

// route files
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { errorHandler, notFound } = require("./middleware/ErrorHandler");

// middleware

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.json());

app.use(cors());

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hotels", hotelRoutes);

app.post("/upload", uploadRoutes);

app.post("/demoRoute", async (req, res) => {
  //   res.send("Hello from demoRoute");
  console.log(req.body);

  res.status(201).json({
    success: "True",
  });
});

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
