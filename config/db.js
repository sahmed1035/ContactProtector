// bringing mongoose
const mongoose = require("mongoose");
// bringing config to access the global variable we created.
const config = require("config");
// initializing a variable called db and put in the Mongo URI.
const db = config.get("mongoURI");

// creating a function called connectDB and use mongoose to return promises.
// without sync await
// with sync await

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit with failure
  }
};

module.exports = connectDB;
