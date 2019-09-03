// entry point to our backend
// creating Express Server
// import Express from "express"; we can't use the import syntax without implementing babble or typescript. otherwise we have to use required syntax to bring in modules which is called commonJS.
// when we use React it actually uses ES6 modules which has import syntax.
const express = require("express");
// bringing in connectDB
const connectDB = require("./config/db");

// initializing express into a variable called app.
const app = express();

// calling connectDB to connect to the database
connectDB();

// Init Middleware. middle ware used to be body parser but now included with express. Now we can accept data
app.use(express.json({ extended: false }));
// creating a variable for the port. process.env.PORT will look for an environment variable called PORT first and
// this will be used in production. OR anyport we want ||
const PORT = process.env.PORT || 5000;

/***Endpoints to hit. Open up postman and type http://localhost:5000
 * adding an endpoint (route) for the home page by using app dot and then whatever the request we want to handle.
 * we are making a get request / (home page).
 * it takes an arrow function with a request and response object. we will do res dot send. we will just send Hello World.
 app.get("/", (req, res) => res.send("Hello World!"));
 */
//we need to get res.json becuase it is going to be a json API.
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the ContactProtector API" })
);

// Define Routes
/**
 * every BACKEND ROUTE to start with '/api'.
 * whenever someone hits the route /api/users, it is going to look for the users.js. so we are going to require it.
 */
app.use("/api/users", require("./routes/users")); // '/api/users/' is going to get forwarded to the file users
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
/***NOW SERVER SHOULD RUN:
 * node server.js will not run nodemon dependency.
 * npm run server . it will run nodemon with the server.
 */
// this app object will have a listen method. this is going to take in a port to listen on.
// it can take in a callback if we want something else to happen. we will do a console log. using backtick to use {}
app.listen(PORT, () =>
  console.log(`Server for Contact-Protector App has started on port ${PORT}`)
);
