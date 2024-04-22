const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
// const errorMiddleware = require("./middleware/error");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const authRoutes = require("./app/routes/authRoute");
const userRoutes = require("./app/routes/userRoute");
const brandRoutes = require("./app/routes/brandRoute");
const groupRoutes = require("./app/routes/groupRoute");
const sizeCategoryRoutes = require("./app/routes/sizes/sizecategory");
const categoryRoutes = require("./app/routes/categorization/categoryRoute");

app.use(process.env.API_VERSION + "/auth", authRoutes);
app.use(process.env.API_VERSION + "/user", userRoutes);
app.use(process.env.API_VERSION + "/brands", brandRoutes);
app.use(process.env.API_VERSION + "/categorization/groups", groupRoutes);
app.use(process.env.API_VERSION + "/sizes/sizecategories", sizeCategoryRoutes);
app.use(process.env.API_VERSION + "/categorization/categories", categoryRoutes);

// app.use(errorMiddleware);

module.exports = app;
