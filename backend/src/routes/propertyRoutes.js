const express = require("express");
const router = express.Router();

const {
  createProperty,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
} = require("../controllers/propertyController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, createProperty);
router.get("/", protect, getMyProperties);
router.get("/:id", protect, getPropertyById);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

router.post(
  "/:id/images",
  protect,
  upload.array("images", 10),
  uploadPropertyImages
);

module.exports = router;