const express = require("express");
const router = express.Router();
// middle ware
const auth = require("../middleware/auth");
// bringing in express validator
const { check, validationResult } = require("express-validator");

// bringing in User and Contact models
const User = require("../models/User");
const Contact = require("../models/Contact");
// going to have four routes for CRUD (Create Read Update Delete)
// First
// @route           GET api/contacts
// @description     Get all users contacts
// @access          Private

// to make this route a protected route, we need to add auth as a second parameter
router.get("/", auth, async (req, res) => {
  // we need to pull from our database we will do a try catch. where the user matches request dot user dot id.
  // sort by date. -1 for most recent contact on the top.
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// Second
// @route           POST api/contacts
// @description     Add new contact
// @access          Private route so going to add auth and validation as second parameter
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // pulling out the data from the body. deconstructing
    const { name, email, phone, type } = req.body;

    // going to do a try catch. inside the try, create a newContact and set that to new Contact(). pass an object with
    // the field which is the name, email, phone, type
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id //have access through auth middleware
      });
      // we are going to add newContact to contact. save it to the database
      const contact = await newContact.save();
      res.json(contact); // sending to client
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

// Third. we need to tell what contact to update /:id
// @route           PUT api/contacts/:id
// @description     Update contact
// @access          Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// Fourth. we need to tell what contatct to delete /:id
// @route           DELETE api/contacts/:id
// @description     Delete contact
// @access          Private
router.delete("/:id", auth, async (req, res) => {
  // we want to pull out the data
  const { name, email, phone, type } = res.body;

  // since this is an update, we build a contact object based on the fields that are submitted
  // we want to check to see if these fields are submitted.
  const contactFields = {};
  if (name) contactFields.name = name; // if there is a name add that to contactFields
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  // find contact by id in the database. take the id from the param
  try {
    let contact = await Contact.findById(req.params.id);

    // if contact not found in the database by that id, send a message
    if (!contact) return res.status(404).json({ msg: "Contact not found!" });

    // we need to make sure that the user owns the contact. contact.user => token in the database
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized!" });
    }

    // Now updating the contact. if doesn't exists then create a new one.
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    // sending new contact
    res.jsoon(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// exporting the router
module.exports = router;
