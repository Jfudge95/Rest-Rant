require("dotenv").config(); // We need to do this to ensure we can use the value of the MONGO_URI environment variable.
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected")) // This will tell us if we are connected to the DB in our terminal.
  .catch((err) => console.error(err));

module.exports.Place = require("./places");
module.exports.Comment = require("./comment");
