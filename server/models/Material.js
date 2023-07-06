const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 60,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("material", MaterialSchema);
