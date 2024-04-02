const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllUsers,
} = require("../controllers/userControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get(
  "",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  getAllUsers
);
router.get("/me", isAuthenticatedUser, getProfile);
router.put("/update", isAuthenticatedUser, updateProfile);

module.exports = router;
