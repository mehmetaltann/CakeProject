const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("semiproduct", SemiProductSchema);
