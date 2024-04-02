const db = require("../models");

const Company = db.Company;

exports.addCompany = async (req, res, next) => {
  try {
    const company = await Company.findOne({
      where: {
        vName: req.body.vName,
      },
    });

    if (company) {
      return res.status(400).json({
        success: true,
        message: "Company already exist",
      });
    }

    const newCompany = await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: "Company created",
      company: newCompany,
    });
  } catch (error) {}
};

exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();

    res.status(201).json({
      success: true,
      companies,
    });
  } catch (error) {}
};
