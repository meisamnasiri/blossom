const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [1, "Board must have a name."],
    maxLength: [25, "Too long for board name."],
    required: [true, "Board name is required."],
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: ObjectId,
    required: [true, "Only registered users can create a board."],
  },
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
