const mongoose = require("mongoose");

module.exports = mongoose.model("Item", {
  itemName: String,
  description: String,
  type: {
    type: String,
    enum: ["Lost", "Found"]
  },
  location: String,
  date: {
    type: Date,
    default: Date.now
  },
  contactInfo: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});