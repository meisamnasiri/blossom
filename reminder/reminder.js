const { Todo } = require("../todo/todoModel");

module.exports = async function reminder() {
  const todoList = await Todo.find({
    hasArrived: false,
    dueDate: { $ne: null },
  });

  for (const [index, todo] of Object.entries(todoList)) {
    const dueDate = todo.dueDate;
    if (dueDate && dueDate.getTime() <= Date.now()) {
      console.log(`Time to ${todo.task}`);
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todo._id },
        { hasArrived: true },
        { new: true }
      );
    }
  }

  setTimeout(reminder, 6000);
};
