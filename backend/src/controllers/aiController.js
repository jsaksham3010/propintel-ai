const mongoose = require("mongoose");
const Property = require("../models/Property");
const {
  ai,
  analyzePropertyImages,
} = require("../services/geminiService");

// ======================================
// Test Gemini Connection
// ======================================
exports.testAI = async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello from PropIntel AI.",
    });

    return res.status(200).json({
      success: true,
      message: "Gemini AI connected successfully.",
      response: response.text,
    });
  } catch (error) {
    console.error("Gemini Connection Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to connect to Gemini AI.",
    });
  }
};

// ======================================
// Analyze Property Images
// ======================================
exports.analyzeProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID.",
      });
    }

    const property = await Property.findOne({
      _id: propertyId,
      owner: req.user.id,
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    if (!property.images || property.images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No property images found.",
      });
    }

    const imageUrls = property.images.map((img) => img.url);

    const aiResponse = await analyzePropertyImages(imageUrls);

    // Remove markdown if Gemini returns it
    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedReport;

    try {
      parsedReport = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON.",
        rawResponse: aiResponse,
      });
    }

    property.aiReport = parsedReport;
    property.analyzedAt = new Date();

    await property.save();

    return res.status(200).json({
      success: true,
      message: "AI analysis completed successfully.",
      propertyId: property._id,
      propertyTitle: property.title,
      analyzedAt: property.analyzedAt,
      report: parsedReport,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

// ======================================
// Get Single AI Report
// ======================================
exports.getAIReport = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID.",
      });
    }

    const property = await Property.findOne({
      _id: propertyId,
      owner: req.user.id,
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
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
      propertyTitle: property.title,
      analyzedAt: property.analyzedAt,
      report: property.aiReport,
    });
  } catch (error) {
    console.error("Get AI Report Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

// ======================================
// Get All AI Reports
// ======================================
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
    console.error("Get My Reports Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};