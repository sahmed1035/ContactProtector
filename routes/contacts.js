const express = require("express");
const router = express.Router();
// going to have four routes for CRUD (Create Read Update Delete)
// First
// @route           GET api/contacts
// @description     Get all users contacts
// @access          Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
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
