const Board = require("./boardModel");
const Todo = require("../todo/todoModel");

async function getBoard(id) {
  const board = await Board.findById(id);
  return board;
}

async function createBoard(obj) {
  const board = new Board({
    name: obj.name,
    dateCreated: new Date(),
    userId: obj.userId,
  });

  return await board.save();
}

async function deleteBoard(boardId) {
  const result = await Board.deleteOne({ _id: boardId });
  if (result.acknowledged) {
    const boardTodos = await Todo.deleteMany({ boardId: boardId });
    return boardTodos;
  } else {
    return result;
  }
}

async function updateBoard(obj) {
  const result = await Board.updateOne(
    { _id: obj._id },
    {
      name: obj.name,
    }
  );

  return result;
}

module.exports = {
  createBoard,
  deleteBoard,
  updateBoard,
  getBoard,
};
