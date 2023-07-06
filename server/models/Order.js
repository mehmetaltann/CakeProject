const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    cost: {
      type: Number,
      trim: true,
      maxLength: 20,
    },
    customer: { type: Schema.Types.ObjectId, ref: "customer" },
    products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
