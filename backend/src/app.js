const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 PropIntel AI Backend is Running!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

module.exports = app;
