const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: String,
  dateCreated: Date,
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
