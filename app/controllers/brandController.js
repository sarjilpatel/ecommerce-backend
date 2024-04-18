const db = require("../models");

const Brand = db.Brand;

exports.addBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findOne({
      where: {
        vName: req.body.vName,
      },
    });
    if (brand) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Brand With this name already exist",
      });
    }

    const newBrand = await Brand.create({
      ...req.body,
    });

    res.status(201).json({
      status: 201,
      success: true,
      brand: newBrand,
      message: "Brand created successfully!!",
    });
  } catch (error) {
    console.error("Error adding brand:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    res.status(201).json({
      status: 201,
      success: true,
      brands,
    });
  } catch (error) {
    console.error("Error adding brand:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
