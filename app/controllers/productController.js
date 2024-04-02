// const User = require("../models/userModel");
const { Op, where } = require("sequelize");
const db = require("../models");

const Product = db.Product;
const CateGory = db.Category;
const CartItem = db.CartItem;
const Review = db.Review;
const User = db.User;
const SubCategory = db.SubCategory;
const Category = db.Category;
const ProductImageItem = db.ProductImageItem;

exports.addProduct = async (req, res, next) => {
  try {
    let product = await Product.create(req.body);

    const uploadedImages = req.files;

    uploadedImages &&
      uploadedImages.map(async (ui) => {
        await ProductImageItem.create({
          vUrl: "/uploads/products/" + ui.filename,
          iProductId: product.id,
        });
      });

    product = await Product.findOne({
      where: {
        id: product.id,
      },
    });

    res.status(201).json({
      status: 201,
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { subcategory, category, search, pageNo, limit } = req.query;

    const pageNoInt = parseInt(pageNo, 10);
    const limitInt = parseInt(limit, 10);

    // console.log(subcategory, "***************************************");

    let whereClause = {};

    if (subcategory || category || search) {
      whereClause = {
        [Op.and]: [
          subcategory && { iSubCategoryId: subcategory },
          category && { iCategoryId: category },
          search && {
            [Op.or]: [
              {
                vTitle: {
                  [Op.like]: `%${search}%`,
                },
              },
              {
                tDescription: {
                  [Op.like]: `%${search}%`,
                },
              },
            ],
          },
        ].filter(Boolean),
      };
    }

    console.log(whereClause);

    const products = await Product.findAll({
      where: { ...whereClause, dDeletedAt: null },
      include: [
        {
          model: Review,
        },
        {
          model: SubCategory,
        },
        {
          model: CateGory,
        },
        {
          model: ProductImageItem,
        },
      ],
      offset: ((pageNoInt ? pageNoInt : 1) - 1) * 20,
      limit: limitInt ? limitInt : null,
    });

    // console.log(products, "producttttttttttttttttttttttttttt");

    res.status(200).json({
      status: 200,
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: SubCategory,
        },
        {
          model: Category,
        },
        {
          model: Review,
          include: [{ model: User }],
        },
      ],
    });

    res.status(200).json({
      status: 200,
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    let product = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    product = await Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: CateGory,
        },
      ],
    });

    res.status(200).json({
      status: 200,
      success: true,
      product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found",
      });
    }

    await Product.update(
      { dDeletedAt: Date.now() },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
