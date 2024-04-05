const { Router } = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addBrand } = require("../controllers/brandController");

const router = Router();

//Profile Update, Get profile

router.post("/add", isAuthenticatedUser, authorizeRoles("admin"), addBrand);

module.exports = router;
