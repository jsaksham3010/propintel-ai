const Property = require("../models/Property");
const {
  ai,
  analyzePropertyImages,
} = require("../services/geminiService");

// ==============================
// Test Gemini Connection
// ==============================
exports.testAI = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: "Say hello from PropIntel AI.",
    });

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to connect to Gemini AI",
    });
  }
};

// ==============================
// Analyze Property Images
// ==============================
exports.analyzeProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({
      _id: propertyId,
      owner: req.user.id,
    });

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

    // Remove markdown if Gemini returns it
    const cleanReport = aiReport
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

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

    property.aiReport = parsedReport;
    property.analyzedAt = new Date();

    await property.save();

    return res.status(200).json({
      success: true,
      propertyId: property._id,
      analyzedAt: property.analyzedAt,
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

// ==============================
// Get Single AI Report
// ==============================
exports.getAIReport = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({
      _id: propertyId,
      owner: req.user.id,
    });

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
    console.error("Get AI Report Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All AI Reports
// ==============================
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Property.find({
      owner: req.user.id,
      aiReport: { $ne: null },
    })
      .select(
        "title city state propertyType price area images aiReport analyzedAt createdAt"
      )
      .sort({ analyzedAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Get Reports Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};