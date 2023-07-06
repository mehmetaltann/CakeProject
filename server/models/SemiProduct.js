const mongoose = require("mongoose");

const SemiProductSchema = new mongoose.Schema(
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
    materials: [{ type: Schema.Types.ObjectId, ref: "material" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("semiproduct", SemiProductSchema);
