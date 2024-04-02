const express = require("express");
const {
  loginUser,
  signupUser,
  logoutUser,
} = require("../controllers/userControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const upload = require("../middleware/multer");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/userImages");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.single("vImage"), signupUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticatedUser, logoutUser);

module.exports = router;
