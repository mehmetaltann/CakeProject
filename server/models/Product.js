const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 60,
    },
    description: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
      maxLength: 40,
    },
    materials: [
      {
        mtNumber: {
          type: Number,
          required: true,
          trim: true,
          maxLength: 20,
        },
      },
    ],
    semiproducts: [
      {
        spNumber: {
          type: Number,
          required: true,
          trim: true,
          maxLength: 20,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
