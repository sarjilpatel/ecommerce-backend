const { Op } = require("sequelize");
const db = require("../models");

const SubCategory = db.SubCategory;
const Product = db.Product;
const Category = db.Category;
const Group = db.Group;

exports.headerSearch = async (req, res, next) => {
  try {
    const { query } = req.query;

    const subcategories = await SubCategory.findAll({
      where: {
        [Op.or]: [
          {
            vName: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      include: [
        {
          model: Category,
          include: [
            {
              model: Group,
            },
          ],
        },
      ],
      limit: 10,
    });

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            vTitle: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },

      limit: 10,
    });

    res.status(200).json({
      success: true,
      subcategories,
      products,
    });
  } catch (error) {
    console.error("Error search in header:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
