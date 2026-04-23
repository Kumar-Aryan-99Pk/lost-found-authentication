const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String
});