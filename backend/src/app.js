const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

const app = express();

// ==============================
// Security Middleware
// ==============================
app.use(helmet());

// ==============================
// CORS
// ==============================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// ==============================
// Request Logging
// ==============================
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// ==============================
// Body Parsers
// ==============================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ==============================
// Response Compression
// ==============================
app.use(compression());

// ==============================
// Health Check
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 PropIntel AI Backend is Running!",
    version: "1.0.0",
  });
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error.",
  });
});

module.exports = app;