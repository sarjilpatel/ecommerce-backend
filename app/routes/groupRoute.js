const { Router } = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createGroup,
  getAllGroups,
  deleteGroup,
} = require("../controllers/groupController");

const router = Router();

//Profile Update, Get profile
router
  .route("/")
  .get(getAllGroups)
  .post(isAuthenticatedUser, authorizeRoles("admin", "manager"), createGroup);

router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "manager"),
  deleteGroup
);

module.exports = router;
