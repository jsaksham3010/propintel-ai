const express = require("express");
const router = express.Router();

const {
  testAI,
  analyzeProperty,
  getAIReport,
} = require("../controllers/aiController");

router.get("/test", testAI);

// Analyze property with Gemini
router.post("/analyze/:propertyId", analyzeProperty);

// Fetch saved AI report
router.get("/report/:propertyId", getAIReport);

module.exports = router;