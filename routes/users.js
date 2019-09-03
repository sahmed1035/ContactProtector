// registring users routes
// bringing express so that we can use the router
const express = require("express");
// create a variable router and set that to express.Router
const router = express.Router();
// (npm install --save express-validator). requiring
const { check, validationResult } = require("express-validator");

// bringing User model
const User = require("../models/User");

//instead of app.post or get we are going to do router.post.
/**
 * post request is for submitting data to the server
 * get request is for fetching data from the server
 * put request is for updating data to the server
 * delete request is for deleting data from the server
 *
 *  */
// @route POST api/users (route, type of request, endpoint) Now '/' pertains to api/users
// @desc Register a user
// @access Public (access is for our private routes where you have to be logged in. You have to have a token stored and send a token to access. going to be Public becuse it is to register and become a user. )
// req.body gives the data that's sent to the route. in this case it will be email, password....
/***
 * Limit the scope of what could be sent. Error checking by express validator.
 * field and message for check method. then add the rule.
 */

router.post(
  "/",
  [
    check("name", "Please Enter a Name")
      .not()
      .isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or More Characters."
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    res.send(req.body);
  }
);

// exporting the router
module.exports = router;
