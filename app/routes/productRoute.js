const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/productController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

const { Router } = require("express");

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

//Multer

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  upload.any("aImages", 100),
  addProduct
);

router.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  updateProduct
);
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  deleteProduct
);

module.exports = router;
