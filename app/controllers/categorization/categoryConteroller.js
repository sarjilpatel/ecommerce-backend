const db = require("../../models");

const Category = db.Category;
const Group = db.Group;
const SizeCategory = db.SizeCategory;

exports.addCategory = async (req, res, next) => {
  try {
    const { vName, uGroupId, uSizeCategoryId } = req.body;

    console.log(vName, uGroupId, uSizeCategoryId, "*********");
    const isPresentCategory = await Category.findOne({
      where: { vName, uGroupId },
    });

    if (isPresentCategory) {
      return res.status(400).json({
        success: false,
        message: "Category Already exists",
      });
    }

    const group = await Group.findOne({
      where: {
        id: uGroupId,
      },
    });

    if (!group) {
      return res.status(400).json({
        success: false,
        message: "Group not found",
      });
    }

    const sizecategory = await SizeCategory.findOne({
      where: {
        id: uSizeCategoryId,
      },
    });

    if (!sizecategory) {
      return res.status(400).json({
        success: false,
        message: "Group not found",
      });
    }

    const category = await Category.create(req.body);

    res.status(201).json({
      status: 201,
      success: true,
      category,
      message: "Category Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Group,
        },
        {
          model: SizeCategory,
        },
      ],
    });

    res.status(200).json({
      status: 200,
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = Category.findOne({ where: { id: req.params.id } });
    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Category Updated",
    });
  } catch (error) {
    console.error("Error in updating category: ", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Category not found",
      });
    }

    // const products = await Product.findAll({
    //   where: { CategoryId: category.id },
    // });

    // // Extract product ids
    // const productIds = products.map((product) => product.id);

    // // Delete associated cart items based on product ids
    // await CartItem.destroy({ where: { ProductId: productIds } });

    // // Delete associated products
    // await Product.destroy({ where: { CategoryId: category.id } });

    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    const categories = await Category.findAll();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Category deleted Successfully",
      categories,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
