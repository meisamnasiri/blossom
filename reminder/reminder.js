const { Todo } = require("../todo/todoModel");

module.exports = async function reminder() {
  const todoList = await Todo.find({
    hasArrived: false,
    dueDate: { $ne: null },
  });
  console.log("todo list is: ", todoList.length);

  for (const todo of todoList) {
    const dueDate = todo.dueDate;
    if (dueDate && dueDate.getTime() <= Date.now()) {
      console.log(`Time to ${todo.task}`);
      await Todo.findOneAndUpdate({ _id: todo._id }, { hasArrived: true });
    }
  }

  setTimeout(reminder, 1000);
};
