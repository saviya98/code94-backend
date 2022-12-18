const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  favorites: 
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Favorites",
    },
  
});

module.exports = mongoose.model("User", userSchema);
