const express = require("express");
const router = express.Router();

const { createProperty } = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createProperty);

module.exports = router;
