const db = require("../models");

const Group = db.Group;
const Category = db.Category;
const SubCategory = db.SubCategory;

exports.createGroup = async (req, res, next) => {
  try {
    let group = await Group.findOne({
      where: {
        vName: req.body.vName,
      },
    });

    if (group) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Group already exist!",
      });
    }

    group = await Group.create({ vName: req.body.vName });

    res.status(201).json({
      status: 201,
      success: true,
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getAllGroups = async (req, res, next) => {
  try {
    let groups = await Group.findAll({
      include: {
        model: Category,
        include: {
          model: SubCategory,
        },
      },
    });

    res.status(200).json({
      status: 200,
      success: true,
      groups,
    });
  } catch (error) {
    console.error("Error getting All group:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    let group = await Group.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        status: 400,
        message: "Group not found!",
      });
    }

    await Group.destroy({
      where: {
        id: req.params.id,
      },
    });

    const groups = await Group.findAll();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Group deleted successfully",
      groups,
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
