const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: String,
  dateCreated: Date,
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
