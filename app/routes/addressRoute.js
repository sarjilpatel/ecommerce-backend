const { Router } = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getAllAddress,
  addAddress,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const router = Router();

//Profile Update, Get profile

router.get("/", isAuthenticatedUser, getAllAddress);

router.post("/", isAuthenticatedUser, addAddress);

router.get("/:id", isAuthenticatedUser, getSingleAddress);
router.put("/:id", isAuthenticatedUser, updateAddress);
router.delete("/:id", isAuthenticatedUser, deleteAddress);

module.exports = router;
