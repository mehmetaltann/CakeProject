const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 60,
    },
    surname: {
      type: String,
      trim: true,
      maxLength: 60,
    },
    orders: [
      {
        mtNumber: {
          type: Number,
          trim: true,
          maxLength: 20,
        },
      },
    ],
    phonenumber: {
      type: String,
      trim: true,
      maxLength: 60,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 60,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", CustomerSchema);
