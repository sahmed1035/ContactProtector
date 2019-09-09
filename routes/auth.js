// registring users routes
//we need Being able to login to get a token as well.
//Login authentication route is going to go in our outh.js.
// bringing express so that we can use the router
const express = require("express");
// create a variable router and set that to express.Router
const router = express.Router();

const bcrypt = require("bcryptjs");
// bringing JSON Web Token
const jwt = require("jsonwebtoken");
// bringin config becuase it has jwt secret.
const config = require("config");

// bringing middleware to protect a route
const auth = require("../middleware/auth");

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
// First Route is to get the logged in user
// @route GET api/auth (route, type of request, endpoint) Now '/' pertains to api/users
// @desc Get logged in user
// @access Private (getting a user who is logged in so it is private)
// this is a private protected route. anytime we need to protect a route, we need to bring in the middleware
// pass it as a second parameter

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // send NO password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// Second Route is to actually login the user and get the token.
// @route POST api/auth ( sending data to get authenticated)
// @desc Auth user and get token
// @access Public (so that u can access the private routes)
// validation to check if there is an email and a password sent.
router.post(
  "/",
  [
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    //if there is error send this response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // taking email and passowrd out of the body
    const { email, password } = req.body;
    // doing a try and catch. check by email if a user exists. User.findOne returns a promise.
    // if there is not a user then we want to send back an error that invalid credentials.

    try {
      let user = await User.findOne({ email });

      // if there is no user with that email then let's
      //return a status of 400 and send back some JASON that says "Invaild Credentials!"
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }
      // if there is a user then we want to continue to check the password becuase up to this point
      //we've only checked the email. create a variable called isMatch and set this to await because
      //bcrypt. compare returns a promise. it takes plain text password (comes from the body) and
      //the hash password (password stored in the database).
      const isMatch = await bcrypt.compare(password, user.password);

      // they are gonna return true or false
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials!" });
      }
      // if password does match, then send the token.
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // return the token
        }
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// exporting the router
module.exports = router;
