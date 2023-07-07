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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteBoard(id);
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  const obj = req.body;
  const result = await updateBoard(obj);
  res.status(200).send(result);
});

module.exports = router;
