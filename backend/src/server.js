const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const app = require("./app");

// ==============================
// Validate Required Environment Variables
// ==============================
const requiredEnv = [
  "MONGO_URI",
  "JWT_SECRET",
  "GEMINI_API_KEY",
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingEnv.join(", ")}`
  );
  process.exit(1);
}

// ==============================
// Connect Database
// ==============================
connectDB();

const PORT = process.env.PORT || 3001;

// ==============================
// Start Server
// ==============================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// ==============================
// Graceful Shutdown
// ==============================
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM received. Closing server...");
  server.close(() => {
    console.log("✅ Server closed.");
    process.exit(0);
  });
});