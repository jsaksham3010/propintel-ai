const express = require("express");
const router = express.Router();

const {
  testAI,
  analyzeProperty,
  getAIReport,
  getMyReports,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

router.get("/test", testAI);

// Analyze property with Gemini
router.post("/analyze/:propertyId", protect, analyzeProperty);

// Fetch saved AI report
router.get("/report/:propertyId", protect, getAIReport);

// Fetch all AI reports of logged in user
router.get("/reports", protect, getMyReports);

module.exports = router;