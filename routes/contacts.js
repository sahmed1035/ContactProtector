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
// @access          Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

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
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

// exporting the router
module.exports = router;
