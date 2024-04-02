const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const errorMiddleware = require("./middleware/error");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static("uploads"));

const authRoutes = require("./app/routes/authRoute");
const userRoutes = require("./app/routes/userRoute");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// app.use(errorMiddleware);

module.exports = app;
