const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: String,
  dueDate: Date,
  isFinished: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
