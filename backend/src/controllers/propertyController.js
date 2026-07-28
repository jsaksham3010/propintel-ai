const mongoose = require("mongoose");
const Property = require("../models/Property");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// =========================
// Create Property
// =========================
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

// =========================
// Get My Properties
// Search + Filter + Sort + Pagination
// =========================

exports.getMyProperties = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 10,
      search,
      city,
      propertyType,
      minPrice,
      maxPrice,
      sort,
    } = req.query;


    const query = {
      owner: req.user.id,
    };


    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }


    // City Filter
    if (city) {
      query.city = {
        $regex: city,
        $options: "i",
      };
    }


    // Property Type Filter
    if (propertyType) {
      query.propertyType = propertyType;
    }


    // Price Filter
    if (minPrice || maxPrice) {

      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }

    }


    const skip =
      (Number(page) - 1) * Number(limit);



    let sortOption = {
      createdAt: -1,
    };


    if (sort === "priceAsc") {
      sortOption = {
        price: 1,
      };
    }


    if (sort === "priceDesc") {
      sortOption = {
        price: -1,
      };
    }


    const properties = await Property.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));


    const total = await Property.countDocuments(query);



    return res.status(200).json({

      success: true,

      page: Number(page),

      limit: Number(limit),

      total,

      count: properties.length,

      properties,

    });


  } catch (err) {

    console.error(err);


    return res.status(500).json({

      success:false,

      message:"Internal Server Error",

    });

  }
};
// =========================
// Get Property By ID
// =========================
exports.getPropertyById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
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

// =========================
// Update Property
// =========================
exports.updateProperty = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const allowedUpdates = {
      title: req.body.title,
      city: req.body.city,
      state: req.body.state,
      price: req.body.price,
      area: req.body.area,
      propertyType: req.body.propertyType,
    };

    Object.keys(allowedUpdates).forEach((key) => {
      if (allowedUpdates[key] === undefined) {
        delete allowedUpdates[key];
      }
    });

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// =========================
// Delete Property
// =========================
exports.deleteProperty = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Cloudinary image deletion can be added here later

    await Property.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// =========================
// Upload Property Images
// =========================
exports.uploadPropertyImages = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    // Maximum 10 images per property
    if (property.images.length + req.files.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum 10 images are allowed per property",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      try {
        const result = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);

        return res.status(500).json({
          success: false,
          message: "Failed to upload one or more images",
        });
      }
    }

    property.images.push(...uploadedImages);

    await property.save();

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      count: property.images.length,
      images: property.images,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};