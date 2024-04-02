const {
  addCompany,
  getAllCompanies,
} = require("../controllers/companyController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const { Router } = require("express");

const router = Router();

router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllCompanies)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addCompany);

module.exports = router;
