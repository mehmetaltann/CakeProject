const mongoose = require("mongoose");

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
    materials: [{ type: Schema.Types.ObjectId, ref: "material" }],
    semiproducts: [{ type: Schema.Types.ObjectId, ref: "semiproduct" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
