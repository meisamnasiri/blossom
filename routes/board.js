const express = require("express");
const router = express.Router();
const {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("../board/boardRepository");

router.get("/list", async (req, res) => {
  const boardList = await getBoards();
  res.status(200).send(boardList);
});

router.post("/", async (req, res) => {
  const result = await createBoard(req.body);
  res.status(200).send(result);
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
