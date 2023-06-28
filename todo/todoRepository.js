const Todo = require("./todoModel");

function getTodo() {
  const todo = Todo.findById(id);
}

function createTodo() {
  const todo = new Todo({
    task: "exercise",
    dueDate: "june 30 2023",
  });

  todo.save();
}

function deleteTodo(id) {
  const todo = Todo.findById(id);
}

function updateTodo() {
  const todo = Todo.findById(id);
}

module.exports = {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodo,
};
