const db = require("../models");

const Group = db.Group;
const Category = db.Category;
const SubCategory = db.SubCategory;

exports.addSubCategory = async (req, res, next) => {
  try {
    const { iCategoryId, vName } = req.body;

    const category = await Category.findOne({
      where: {
        id: iCategoryId,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subcategory = await SubCategory.findOne({
      where: {
        iCategoryId,
        vName,
      },
    });

    if (subcategory) {
      return res.status(400).json({
        success: false,
        message: "Sub Category already exist",
      });
    }

    const newSubCategory = await SubCategory.create({
      iCategoryId,
      vName,
    });

    res.status(201).json({
      success: true,
      message: "Subcategory Added successfully",
      subCategory: newSubCategory,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// exports.addSubCategory = async (req, res, next) => {
//     try {
//       const { iCategoryId, vName } = req.body;

//       const category = await Category.findOne({
//         where: {
//           id: iCategoryId,
//         },
//       });

//       if (!category) {
//         return res.status(404).json({
//           success: false,
//           message: "Category not found",
//         });
//       }

//       const subcategory = await SubCategory.findOne({
//         where: {
//           iCategoryId,
//           vName,
//         },
//       });

//       if (subcategory) {
//         return res.status(400).json({
//           success: false,
//           message: "Sub Category already exist",
//         });
//       }

//       const newSubCategory = await SubCategory.create({
//         iCategoryId,
//         vName,
//       });
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
//   };
