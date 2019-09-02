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
// First Route is to get the logged in user
// @route GET api/auth (route, type of request, endpoint) Now '/' pertains to api/users
// @desc Get logged in user
// @access Private (getting a user who is logged in so it is private)

router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// Second Route is to actually login the user and get the token.
// @route POST api/auth ( sending data to get authenticated)
// @desc Auth user and get token
// @access Public (so that u can access the private routes)

router.post("/", (req, res) => {
  res.send("Log in user");
});

// exporting the router
module.exports = router;
