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
router.get("/csv", (req, res) => {
  const data = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
  ];

  // Convert data to CSV format
  const csv = convertToCSV(data);

  // Set headers for response
  res.setHeader("Content-Disposition", 'attachment; filename="data.csv"');
  res.setHeader("Content-Type", "text/csv");

  // Send CSV data as response
  res.json({
    message: "hello",
    csv,
  });

  // Function to convert data to CSV format
  function convertToCSV(data) {
    const header = Object.keys(data[0]).join(","); // Assuming all objects have the same keys
    const rows = data.map((obj) => Object.values(obj).join(","));
    return `${header}\n${rows.join("\n")}`;
  }
});

module.exports = router;
