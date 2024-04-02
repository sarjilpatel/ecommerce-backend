const { Router } = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createOrder,
  getUserOrders,
  getSingleOrder,
  generateInvoice,
} = require("../controllers/orderController");

const router = Router();

//Profile Update, Get profile

router.post("/", isAuthenticatedUser, createOrder);
router.get("/user", isAuthenticatedUser, getUserOrders);

router.get("/invoice/:id", isAuthenticatedUser, generateInvoice);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);

module.exports = router;
