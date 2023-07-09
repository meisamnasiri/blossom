const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    minLength: [1, "Need task."],
    maxLength: [50, "Too long for a task."],
    required: [true, "Need task."],
    trim: true,
  },
  dueDate: Date,
  isFinished: {
    type: Boolean,
    default: false,
  },
  boardId: {
    type: ObjectId,
    required: [true, "Tasks should be part of a board."],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
