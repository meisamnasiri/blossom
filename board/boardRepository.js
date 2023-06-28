const Board = require("./boardModel");

function getBoards() {}

function createBoard(obj) {
  const board = new Board({
    name: obj.name,
  });

  board.save();
}

function deleteBoard(id) {
  const board = Board.findById(id);
}

function updateBoard() {
  const board = Board.findById(id);
}

module.exports = {
  createBoard,
  deleteBoard,
  updateBoard,
};
