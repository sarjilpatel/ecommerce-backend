const { Router } = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addBrand, getAllBrands } = require("../controllers/brandController");

const router = Router();

//Profile Update, Get profile

router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllBrands)
  .post(isAuthenticatedUser, authorizeRoles("admin"), addBrand);

// router.post("/add", isAuthenticatedUser, authorizeRoles("admin"), addBrand);

module.exports = router;
