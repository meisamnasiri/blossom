const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const TodoSchema = new mongoose.Schema({
  task: String,
  dueDate: Date,
  isFinished: {
    type: Boolean,
    default: false,
  },
  boardId: {
    type: ObjectId,
  },
  dateCreated: Date,
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
