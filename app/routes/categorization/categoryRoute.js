const { Router } = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/auth");
const {
  addCategory,
  getAllCategories,
} = require("../../controllers/categorization/categoryConteroller");

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(isAuthenticatedUser, authorizeRoles("admin", "manager"), addCategory);

module.exports = router;
