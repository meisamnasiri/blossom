const Board = require("./boardModel");

async function getBoards() {
  const boardList = await Board.find().sort({ dateCreated: 1 });
  return boardList;
}

async function createBoard(obj) {
  const board = new Board({
    name: obj.name,
    dateCreated: new Date(),
  });

  return await board.save();
}

async function deleteBoard(id) {
  const result = await Board.deleteOne({ _id: id });
  return result;
}

async function updateBoard(obj) {
  const result = await Board.updateOne(
    { _id: obj.id },
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
  getBoards,
};
