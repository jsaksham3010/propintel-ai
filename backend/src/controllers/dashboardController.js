const Property = require("../models/Property");
const User = require("../models/User");


// ======================================
// Dashboard Statistics
// ======================================
exports.getDashboardStats = async (req, res) => {

  try {


    let properties;



    // ==========================
    // Role Based Property Access
    // ==========================

    if (req.user.role === "admin") {

      properties = await Property.find().lean();

    } 
    
    else {

      properties = await Property.find({

        owner: req.user.id,

      }).lean();

    }






    const totalProperties = properties.length;





    // ==========================
    // User Statistics
    // ==========================

    let totalUsers = 0;

    let totalBuilders = 0;

    let totalBuyers = 0;

    let totalAdmins = 0;



    if(req.user.role === "admin"){


      totalUsers = await User.countDocuments();


      totalBuilders = await User.countDocuments({

        role:"builder"

      });


      totalBuyers = await User.countDocuments({

        role:"buyer"

      });


      totalAdmins = await User.countDocuments({

        role:"admin"

      });


    }








    // ==========================
    // AI Analyzed Properties
    // ==========================

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

        (property)=>

          property.aiReport?.overallScore

      )

      .filter(

        (score)=>

          typeof score === "number"

      );





    const averageScore = scores.length

      ? Math.round(

          scores.reduce(

            (sum,score)=>sum+score,

            0

          )

          /

          scores.length

        )

      :0;









    // ==========================
    // Risk Distribution
    // ==========================


    const riskDistribution = {


      low:0,

      medium:0,

      high:0,


    };





    analyzedProperties.forEach(

      (property)=>{


        const risk =

          property.aiReport?.riskAnalysis?.riskLevel ||

          property.aiReport?.riskLevel ||

          "";



        const normalizedRisk =

          risk.toLowerCase();





        if(normalizedRisk.includes("low")){


          riskDistribution.low++;


        }


        else if(normalizedRisk.includes("medium")){


          riskDistribution.medium++;


        }


        else if(normalizedRisk.includes("high")){


          riskDistribution.high++;


        }



      }

    );









    // ==========================
    // Investment Distribution
    // ==========================


    const investmentDistribution = {};





    analyzedProperties.forEach(

      (property)=>{


        const rating =

          property.aiReport?.investmentAnalysis?.investmentRating ||

          "Unknown";





        investmentDistribution[rating] =

          (

            investmentDistribution[rating] || 0

          ) + 1;



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

          (

            propertyTypes[type] || 0

          ) + 1;



      }

    );









    // ==========================
    // Recent AI Reports
    // ==========================


    const recentReports = analyzedProperties

      .sort(

        (a,b)=>

          new Date(b.analyzedAt || 0)

          -

          new Date(a.analyzedAt || 0)

      )


      .slice(0,5)


      .map(

        (property)=>({


          id:property._id,


          title:property.title,


          city:property.city,



          overallScore:

            property.aiReport?.overallScore || 0,



          riskLevel:

            property.aiReport?.riskAnalysis?.riskLevel ||

            property.aiReport?.riskLevel ||

            "Unknown",



          investmentRating:

            property.aiReport?.investmentAnalysis?.investmentRating ||

            "Unknown",



          analyzedAt:

            property.analyzedAt,


        })

      );









    return res.status(200).json({


      success:true,


      role:req.user.role,



      stats:{



        totalUsers,


        totalBuilders,


        totalBuyers,


        totalAdmins,



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