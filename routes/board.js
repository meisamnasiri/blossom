const express = require("express");
const router = express.Router();
const {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("../board/boardRepository");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const obj = {
    name: req.body.name,
    userId: req.user._id,
  };
  const board = await createBoard(obj);
  res.status(200).send(board);
});

router.delete("/:id", auth, async (req, res) => {
  const boardId = req.params.id;
  const result = await deleteBoard(boardId);
  res.status(200).send(result);
});

router.put("/", auth, async (req, res) => {
  const obj = {
    _id: req.user._id,
    name: req.body.name,
  };
  const result = await updateBoard(obj);
  res.status(200).send(result);
});

module.exports = router;
