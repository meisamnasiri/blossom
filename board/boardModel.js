const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: String,
  dateCreated: Date,
  userId: ObjectId,
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
