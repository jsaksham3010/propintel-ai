console.log("AUTH MIDDLEWARE LOADED");

const jwt = require("jsonwebtoken");


exports.protect = (req, res, next) => {

  console.log(
    "====== PROTECT CHECK ======"
  );

  console.log(
    "URL:",
    req.originalUrl
  );

  console.log(
    "AUTH HEADER:",
    req.headers.authorization
  );


  try {

    const authHeader = req.headers.authorization;


    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({

        success:false,

        message:"No token provided"

      });

    }


    const token =
      authHeader.split(" ")[1];


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    console.log(
      "USER:",
      decoded
    );


    req.user = decoded;


    next();


  } catch(err) {


    console.log(
      "JWT ERROR:",
      err.message
    );


    return res.status(401).json({

      success:false,

      message:"Invalid token"

    });


  }

};