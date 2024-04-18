const { Router } = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/auth");
const {
  getAllSizeCategories,
  addSizeCategory,
} = require("../../controllers/sizes/sizeCategoryController");

const router = Router();

router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllSizeCategories)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addSizeCategory);

module.exports = router;
