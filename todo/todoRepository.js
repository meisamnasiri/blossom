const Todo = require("./todoModel");

async function getTodoList(boardId) {
  const todoList = await Todo.find({ boardId: boardId }).sort({
    dateCreated: 1,
  });
  return todoList;
}

async function createTodo(obj) {
  const todo = new Todo({
    task: obj.task,
    dueDate: obj.dueDate,
    boardId: obj.boardId,
    dateCreated: new Date(),
  });

  return await todo.save();
}

async function deleteTodos(idList) {
  const result = await Todo.deleteMany({ _id: { $in: idList } });
  return result;
}

async function updateTodo(obj) {
  const result = await Todo.updateOne(
    { _id: obj._id },
    {
      task: obj.task,
      dueDate: obj.dueDate,
      isFinished: obj.isFinished,
    }
  );

  return result;
}

module.exports = {
  createTodo,
  deleteTodos,
  updateTodo,
  getTodoList,
};
