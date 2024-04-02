const db = require("../models");
const User = db.User;
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  console.log(req.cookies);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Login to access this resource",
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedData) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  req.user = await User.findOne({ where: { id: decodedData.id } });

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.eRole)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.eRole} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
