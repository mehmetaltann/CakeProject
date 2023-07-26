const mongoose = require("mongoose");


const ParameterSchema = new mongoose.Schema({
  variant: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  content: [
    {
      title: String,
      value: String,
    },
  ],
});

module.exports = mongoose.model("parameter", ParameterSchema);