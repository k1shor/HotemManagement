require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const path = require("path");
const multer = require("multer");

const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

// route files
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

const { errorHandler, notFound } = require("./middleware/ErrorHandler");
const upload = require("./routes/uploadRoutes");

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
// app.use("/api/v1/upload", uploadRoutes);

app.post("/api/v1/demoUpload", upload.array("image", 12), async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send("ok");
});

__dirname = path.resolve(); // this

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("../uploads"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
