const mongoose = require("mongoose");
const { boardSchema } = require("../board/boardModel");

const todoSchema = new mongoose.Schema({
  task: String,
  dueDate: Date,
  isFinished: {
    type: Boolean,
    default: false,
  },
  boardId: mongoose.Types.ObjectId,
  dateCreated: Date,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
