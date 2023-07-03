const mongoose = require("mongoose");
const { boardSchema } = require("../board/boardModel");

const TodoSchema = new mongoose.Schema({
  task: String,
  dueDate: Date,
  isFinished: {
    type: Boolean,
    default: false,
  },
  boardId: mongoose.Types.ObjectId,
  dateCreated: Date,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
