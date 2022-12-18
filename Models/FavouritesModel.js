const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products:[ 
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Product",
    },]
  
});

module.exports = mongoose.model("Favorites", favoritesSchema);