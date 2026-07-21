console.log("AUTH MIDDLEWARE LOADED");

const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Debug logs
    console.log("TOKEN LENGTH:", token.length);
    console.log("TOKEN PARTS:", token.split(".").length);
    console.log("TOKEN START:", token.substring(0, 20));
    console.log("SECRET EXISTS:", !!process.env.JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED USER:", decoded);

    req.user = decoded;

    next();

  } catch (err) {

    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};