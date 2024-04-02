// const User = require("../models/userModel");
const db = require("../models");

const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;
const ShippingType = db.ShippingType;
const Address = db.Address;
const asynvWrapper = require("../middleware/catchAsyncErrors");
exports.getAllAddress = async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: {
        iUserId: req.user.id,
      },
    });

    res.status(201).json({
      status: 201,
      success: true,
      addresses,
    });
  } catch (error) {
    console.error("Error getting all address:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const newAddress = await Address.create({
      iUserId: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      status: 201,
      success: true,
      newAddress,
    });
  } catch (error) {
    console.error("Error adding address:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getSingleAddress = asynvWrapper(async (req, res, next) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(201).json({
      status: 201,
      success: true,
      address,
    });
  } catch (error) {
    console.error("Error getting single address:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

exports.updateAddress = async (req, res, next) => {
  try {
    console.log(req.params.id);
    let address = await Address.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!address) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Address Not found",
      });
    }

    await Address.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    address = await Address.findOne({
      where: { id: req.params.id },
    });

    res.status(201).json({
      status: 201,
      success: true,
      address,
      message: "Address updated!!",
    });
  } catch (error) {
    console.error("Error getting single address:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Address Not found",
      });
    }

    await Address.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Address deleted",
    });
  } catch (error) {
    console.error("Error getting single address:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
