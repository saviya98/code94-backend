const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagesArray: [Object],
  userId:[{
    type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
  }]
});

module.exports = mongoose.model("Product", productSchema);