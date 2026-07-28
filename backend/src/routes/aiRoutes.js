const express = require("express");
const router = express.Router();

const {
  testAI,
  analyzeProperty,
  getAIReport,
  getMyReports,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");


// AI Health Check
router.get(
  "/test",
  protect,
  testAI
);


// Analyze Property
router.post(
  "/analyze/:propertyId",
  protect,
  analyzeProperty
);


// Single AI Report
router.get(
  "/report/:propertyId",
  protect,
  getAIReport
);


// All AI Reports
router.get(
  "/reports",
  protect,
  getMyReports
);


module.exports = router;