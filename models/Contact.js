// copying everything from User model and making changes
const mongoose = require("mongoose");

// creating schemas. takes in objects of properties.
// we need to create a relationship between contacts and users because each user has their own set of contacts.
const ContactSchema = mongoose.Schema({
  // user is going to be part of this schema. With mongoDB the documents have object I.D.
  // we have to refer to a specific collection that is going to be 'users'
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  // these are the fields for the contact form. email doesn't need to be unique because we are just storing the information. not creating a user account.
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// will be using it in user route file
module.exports = mongoose.model("contact", ContactSchema);
