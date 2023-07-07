const express = require("express");
const {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodos,
} = require("../todo/todoRepository");
const { getBoard } = require("../board/boardRepository");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const boardId = req.params.id;
  const list = await getTodoList(boardId);
  res.status(200).send(list);
});

router.post("/", auth, async (req, res) => {
  const board = await getBoard(req.body.boardId);
  console.log(req.user._id); // 64a6d58d727731a9b89e80a2
  console.log(board.userId); // new ObjectId("64a6d58d727731a9b89e80a2")
  if (!(req.user._id == board.userId)) {
    return res.status(403).send("You can not access others board.");
  }

  const obj = {
    task: req.body.task,
    dueDate: req.body.dueDate,
    boardId: req.body.boardId,
  };
  const todo = await createTodo(obj);
  res.status(200).send(todo);
});

router.delete("/", async (req, res) => {
  const idsArray = req.body._id;
  const result = await deleteTodos(idsArray);
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  const obj = {
    task: req.body.task,
    dueDate: req.body.dueDate,
    boardId: req.body.boardId,
    isFinished: req.body.isFinished,
  };
  const result = await updateTodo(obj);
  res.status(200).send(result);
});

module.exports = router;
