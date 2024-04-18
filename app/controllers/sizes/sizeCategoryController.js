const db = require("../../models");

const SizeCategory = db.SizeCategory;

exports.addSizeCategory = async (req, res, next) => {
  try {
    const sizeCategory = await SizeCategory.findOne({
      where: {
        vName: req.body.vName,
      },
    });
    if (sizeCategory) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "SizeCategory With this name already exist",
      });
    }

    const newSizeCategory = await SizeCategory.create({
      ...req.body,
    });

    res.status(201).json({
      status: 201,
      success: true,
      SizeCategory: newSizeCategory,
      message: "SizeCategory created successfully!!",
    });
  } catch (error) {
    console.error("Error creating sizecategory:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getAllSizeCategories = async (req, res, next) => {
  try {
    const sizeCategories = await SizeCategory.findAll();
    res.status(201).json({
      status: 201,
      success: true,
      sizeCategories,
    });
  } catch (error) {
    console.error("Error getting sizecategories:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
