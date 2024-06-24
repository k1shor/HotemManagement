require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");

const cookieParser = require("cookie-parser");

const app = express();

connectDB();

// route files
const testRoutes = require("./routes/testRoutes");
const { errorHandler, notFound } = require("./middleware/ErrorHandler");
// middleware

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/test", testRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
