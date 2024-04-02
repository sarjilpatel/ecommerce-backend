const express = require("express");
const { headerSearch } = require("../controllers/searchController");

const router = express.Router();

router.get("/header", headerSearch);

module.exports = router;
