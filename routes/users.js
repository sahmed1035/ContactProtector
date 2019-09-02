// registring users routes
// bringing express so that we can use the router
const express = require("express");
// create a variable router and set that to express.Router
const router = express.Router();

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
router.post("/", (req, res) => {
  res.send("Register a user");
});

// exporting the router
module.exports = router;
