const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  addReview,
  getProductsReviews,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", isAuthenticatedUser, addReview);
router.get("/productreviews/:pid", isAuthenticatedUser, getProductsReviews);

module.exports = router;
