const { Router } = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getCart,
  addProductToCart,
  addDiscountCode,
  removeDiscountCode,
  removeProductFromCart,
  setCartProductQuantity,
  changeShipping,
} = require("../controllers/cartController");

const router = Router();

//Profile Update, Get profile

router.get("/", isAuthenticatedUser, getCart);

router.post("/discount/add", isAuthenticatedUser, addDiscountCode);
router.delete("/discount/remove", isAuthenticatedUser, removeDiscountCode);

router.post("/product/add", isAuthenticatedUser, addProductToCart);
router.put("/product/setquantity", isAuthenticatedUser, setCartProductQuantity);
router.delete("/product/:id", isAuthenticatedUser, removeProductFromCart);

router.post("/shipping/change", isAuthenticatedUser, changeShipping);

module.exports = router;
