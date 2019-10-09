/***
 * After we have the token we want to create a piece of middleware to validate the token and pull out the
 * user I.D. or  add it to our request object. So that we can access protected routes.
 * Middleware is a function that has access to the request and response cycle and the request and response object.
 *  So every time we hit an endpoint, we can fire off this middleware. And We want to check to see if there is
 * a token in the header.
 *
 */
const jwt = require("jsonwebtoken");
const config = require("config"); // bringing for the jwtSecret

// want to export it. set it to a function which will take request, response and next. next is to tell move on tho the next middleware
module.exports = function(req, res, next) {
  // Get token from header.  with the request object we can accesss the header
  //we are going to send the token in x-auth-token. That's basically the key to the token inside the header.
  const token = req.header("x-auth-token"); //
  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  // if there is a token, we need to varify it. put a try catch. we need to pass a token and varify it.
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    /**
     * once it is varified, the payload is going to be put into decoded.
     * we want to take the user out. we only have the user I.D. but we are going to assign that user to the request object.
     *
     */

    req.user = decoded.user;
    next();
  } catch (err) {
    // if not valid. 401 un outhorized error
    res.status(401).json({ msg: "Token is not valid" });
  }
};
