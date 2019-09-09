// registring users routes
// bringing express so that we can use the router
const express = require("express");
// create a variable router and set that to express.Router
const router = express.Router();
const bcrypt = require("bcryptjs");
// bringing JSON Web Token
const jwt = require("jsonwebtoken");
// bringin config becuase it has jwt secret.
const config = require("config");

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
  async (req, res) => {
    // res.send(req.body); 400 means bad data. user didn't fulfil the requirement.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // request.body should have name, email and password. // destruturing

    const { name, email, password } = req.body;

    /*** ERROR CHECKING
     * creating try/catch becuase we will be using sync await dealing with the database and also with bcrypt
     * which also returns
     * promises that their methods will return a promise.
     *  first we want to check if there is a user with that email, if yes, then will will return a message
     * saying 'user already exists.
     * we can't use await unless we mark our function as sync
     */

    try {
      // take our User Model and use Mongoose method called findOne().
      // we can find a user based on any field. here we are going to use email.
      // we can also write {email: email} since both are called email, we can just write email in ES6.
      let user = await User.findOne({ email });
      // want to check if a user exists. then we want to return a response in a json object with a msg. 400 status, bad request
      if (user) {
        return res.status(400).json({ msg: "Email already exists!" });
      }
      // if email doesn't exist then take the user variable that we initialized above and set it to new User.
      // using User Model to create a new user. Pass in the fields name, email and password as object. {name: name, email...}
      user = new User({
        name,
        email,
        password
      });
      // got created but hasn't been saved in the database
      // before we save it into the database we need to encrypt the password with bcrypt.
      // needed to create a variable called salt in order to encrypt the password.
      // use bcrypt method called GenSalt that will generate a salt. genSalt takes in number of rounds as parameter.
      // it returns promises so we use sync await instead of dot then.

      const salt = await bcrypt.genSalt(10);
      // we can take that salt and hash the password.

      user.password = await bcrypt.hash(password, salt);
      // saving to the database
      await user.save();
      // res.send("User Saved!");
      /***So now we can register a user and add them to our database,
       * we want to respond with a special token. That’s going to have a payload in it.
       * 	User is getting saved in the database but we want to be able to log in right away when
       * we register within React frontend. In order to do that we need to get the tokens send. Basically,
       * we need to sign a JASON web token and send it to the client so that
       * they can store it and use that to access protected routes. */
      // creating payload which is the object we want to send in the token.
      // with this user id we can access all the contacts that the logged in user has.
      const payload = {
        user: {
          id: user.id
        }
      };
      // to generate a token we have to sign it. take JWT and call dot sign which takes in a couple prameters like
      //payload, secret (create in the config file), third parameter is object of options.
      //and a  callback parameter with possible err and the token itsef.

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600 // mean 1 hour. ater that time it will logout.
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

// exporting the router
module.exports = router;
