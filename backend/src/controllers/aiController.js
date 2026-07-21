const Property = require("../models/Property");
const {
  ai,
  analyzePropertyImages,
} = require("../services/geminiService");

// Test Gemini Connection
exports.testAI = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Say hello from PropIntel AI.",
    });

    res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to connect to Gemini AI",
    });
  }
};

// Analyze Property Images
exports.analyzeProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (!property.images || property.images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images found for this property",
      });
    }

    const imageUrls = property.images.map((image) => image.url);

    const aiReport = await analyzePropertyImages(imageUrls);

    // Remove markdown code fences if present
    let cleanReport = aiReport
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Convert string to JSON
    let parsedReport;

    try {
      parsedReport = JSON.parse(cleanReport);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: aiReport,
      });
    }

    // Save AI report in MongoDB
    property.aiReport = parsedReport;
    property.analyzedAt = new Date();

    await property.save();

    return res.status(200).json({
      success: true,
      propertyId: property._id,
      report: parsedReport,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Saved AI Report
exports.getAIReport = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (!property.aiReport) {
      return res.status(404).json({
        success: false,
        message: "AI report not found. Analyze this property first.",
      });
    }

    return res.status(200).json({
      success: true,
      propertyId: property._id,
      analyzedAt: property.analyzedAt,
      report: property.aiReport,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};