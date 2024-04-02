// const User = require("../models/userModel");
const db = require("../models");

const ShippingType = db.ShippingType;

exports.addShippingType = async (req, res, next) => {
  try {
    const shippingType = await ShippingType.create(req.body);

    res.status(201).json({
      status: 201,
      success: true,
      shippingType,
    });
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.getAllShippingTypes = async (req, res, next) => {
  try {
    const shippingTypes = await ShippingType.findAll();

    res.status(200).json({
      status: 200,
      success: true,
      shippingTypes,
    });
  } catch (error) {
    console.error("Error in getting shipping types: ", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.updateShippingType = async (req, res, next) => {
  try {
    const shippingType = ShippingType.findOne({ where: { id: req.params.id } });
    if (!shippingType) {
      return res.status(404).json({
        success: false,
        error: "ShippingType not found",
      });
    }

    await ShippingType.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "ShippingType Updated",
    });
  } catch (error) {
    console.error("Error in updating ShippingType: ", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteShippingType = async (req, res, next) => {
  try {
    const shippingType = ShippingType.findOne({ where: { id: req.params.id } });
    if (!shippingType) {
      return res.status(404).json({
        success: false,
        error: "ShippingType not found",
      });
    }

    await ShippingType.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "ShippingType deleted",
    });
  } catch (error) {
    console.error("Error in deleting ShippingType: ", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
