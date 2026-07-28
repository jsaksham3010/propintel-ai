const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: 50,
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
      maxlength: 50,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    area: {
      type: Number,
      required: [true, "Area is required"],
      min: [1, "Area must be greater than 0"],
    },

    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: {
        values: ["Apartment", "Villa", "Plot", "Commercial"],
        message: "Invalid property type",
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
            trim: true,
          },

          public_id: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],

      default: [],

      validate: {
        validator: function (images) {
          return images.length <= 10;
        },
        message: "Maximum 10 images are allowed.",
      },
    },

    // AI Report generated after analysis
    aiReport: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    analyzedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// Database Indexes
// =========================

propertySchema.index({ city: 1 });
propertySchema.index({ state: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ owner: 1 });
propertySchema.index({ createdAt: -1 });

// =========================
// Virtual Fields
// =========================

propertySchema.virtual("formattedPrice").get(function () {
  return `₹${this.price.toLocaleString("en-IN")}`;
});

// Include virtuals when converting to JSON
propertySchema.set("toJSON", {
  virtuals: true,
});

propertySchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model("Property", propertySchema);