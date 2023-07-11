const express = require("express");
const router = express.Router();
const {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("../board/boardRepository");
const { validateBoard } = require("../board/boardModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const obj = {
    name: req.body.name,
    userId: req.user._id,
  };

  const { error } = validateBoard(obj);
  if (error) return res.status(400).send(error.message);

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

  const { error } = validateBoard(obj);
  if (error) return res.status(400).send(error.message);

  const result = await updateBoard(obj);
  res.status(200).send(result);
});

module.exports = router;
