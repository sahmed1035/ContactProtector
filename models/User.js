const mongoose = require("mongoose");

// creating schemas. takes in objects of properties.
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// will be using it in user route file
module.exports = mongoose.model("user", UserSchema);
