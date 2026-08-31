const Property = require("../models/Property");


// ======================================
// Dashboard Statistics
// ======================================
exports.getDashboardStats = async (req, res) => {

  try {

    const userId = req.user.id;


    const properties = await Property.find({
      owner: userId,
    }).lean();



    const totalProperties = properties.length;



    const analyzedProperties = properties.filter(
      (property) =>
        property.aiReport &&
        property.aiReport.overallScore !== undefined
    );



    const aiReports = analyzedProperties.length;



    // ==========================
    // Average AI Score
    // ==========================

    const scores = analyzedProperties
      .map(
        (property) =>
          property.aiReport?.overallScore
      )
      .filter(
        (score) =>
          typeof score === "number"
      );


    const averageScore = scores.length
      ? Math.round(
          scores.reduce(
            (sum, score) => sum + score,
            0
          ) / scores.length
        )
      : 0;




    // ==========================
    // Risk Distribution
    // ==========================

    const riskDistribution = {

      low: 0,
      medium: 0,
      high: 0,

    };



    analyzedProperties.forEach(
      (property)=>{


        const risk =
          property.aiReport?.riskLevel
          ?.toLowerCase();



        if(risk==="low")
          riskDistribution.low++;


        else if(risk==="medium")
          riskDistribution.medium++;


        else if(risk==="high")
          riskDistribution.high++;


      }
    );






    // ==========================
    // Risk Based Distribution
    // ==========================

    const investmentDistribution = {};



    analyzedProperties.forEach(
      (property)=>{


        const rating =
          property.aiReport?.riskLevel ||
          "Unknown";


        investmentDistribution[rating] =
          (investmentDistribution[rating] || 0) + 1;


      }
    );






    // ==========================
    // Property Type Distribution
    // ==========================

    const propertyTypes = {};



    properties.forEach(
      (property)=>{


        const type =
          property.propertyType ||
          "Unknown";


        propertyTypes[type] =
          (propertyTypes[type] || 0) + 1;


      }
    );







    // ==========================
    // Recent AI Reports
    // ==========================

    const recentReports = analyzedProperties

      .sort(
        (a,b)=>
          new Date(b.analyzedAt || 0) -
          new Date(a.analyzedAt || 0)
      )


      .slice(0,5)


      .map(
        (property)=>({


          id: property._id,


          title:
            property.title,


          city:
            property.city,


          overallScore:
            property.aiReport?.overallScore || 0,


          riskLevel:
            property.aiReport?.riskLevel || "Unknown",


          investmentRating:
            property.aiReport?.riskLevel || "Unknown",


          analyzedAt:
            property.analyzedAt,


        })
      );







    return res.status(200).json({

      success:true,


      stats:{


        totalProperties,


        aiReports,


        averageScore,


        pendingAnalysis:
          totalProperties - aiReports,


      },


      riskDistribution,


      investmentDistribution,


      propertyTypes,


      recentReports,


    });




  }


  catch(error){


    console.error(
      "Dashboard Stats Error:",
      error
    );



    return res.status(500).json({

      success:false,

      message:
        error.message ||
        "Internal Server Error.",

    });


  }

};