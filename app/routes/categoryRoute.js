const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const { Router } = require("express");

const router = Router();

router.get("/", getAllCategories);
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  addCategory
);
router.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  updateCategory
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  deleteCategory
);

module.exports = router;
