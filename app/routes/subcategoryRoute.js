const { Router } = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addSubCategory } = require("../controllers/subcategoryController");

const router = Router();

//Profile Update, Get profile
router
  .route("/")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "manager"),
    addSubCategory
  );

module.exports = router;
