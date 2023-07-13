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
        mtId: { type: String, required: true, trim: true, maxLength: 60 },
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
        spId: { type: String, required: true, trim: true, maxLength: 60 },
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
