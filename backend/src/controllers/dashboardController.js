const Property = require("../models/Property");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const properties = await Property.find({
      owner: userId,
    });

    const totalProperties = properties.length;

    const analyzedProperties = properties.filter(
      (property) => property.aiReport
    );

    const aiReports = analyzedProperties.length;

    let totalScore = 0;
    let scoreCount = 0;

    analyzedProperties.forEach((property) => {
      if (property.aiReport?.overallScore) {
        totalScore += property.aiReport.overallScore;
        scoreCount++;
      }
    });

    const averageScore =
      scoreCount > 0
        ? Math.round(totalScore / scoreCount)
        : 0;

    const pendingAnalysis =
      totalProperties - aiReports;


    res.status(200).json({
      success: true,
      stats: {
        totalProperties,
        aiReports,
        averageScore,
        pendingAnalysis,
      },
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};