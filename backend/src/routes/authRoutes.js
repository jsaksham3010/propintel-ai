const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getCurrentUser,
  sendOTP,
  verifyOTP,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");


// Normal Auth
router.post("/signup", signup);
router.post("/login", login);


// Email OTP Registration
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);


// Current User
router.get("/me", protect, getCurrentUser);


module.exports = router;