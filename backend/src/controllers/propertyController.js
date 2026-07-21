const Property = require("../models/Property");

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      city,
      state,
      price,
      area,
      propertyType,
    } = req.body;

    if (
      !title ||
      !city ||
      !state ||
      !price ||
      !area ||
      !propertyType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const property = await Property.create({
      title,
      city,
      state,
      price,
      area,
      propertyType,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
