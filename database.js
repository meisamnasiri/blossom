const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://0.0.0.0/blossom")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
};
