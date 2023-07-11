const express = require("express");
const {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodos,
} = require("../todo/todoRepository");
const { findBoard } = require("../board/boardRepository");
const auth = require("../middleware/auth");
const { Todo, validateTodo } = require("../todo/todoModel");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const boardId = req.params.id;
  const list = await getTodoList(boardId);
  res.status(200).send(list);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.message);

  const board = await findBoard(req.body.boardId);
  if (!(req.user._id === board.userId.toString())) {
    return res.status(403).send("You can not access this board.");
  }
  const obj = {
    task: req.body.task,
    dueDate: req.body.dueDate,
    boardId: req.body.boardId,
  };
  const todo = await createTodo(obj);
  res.status(200).send(todo);
});

router.delete("/", auth, async (req, res) => {
  let idList = req.body.idList;

  let cleanList = [];
  for (const id of idList) {
    const todo = await Todo.findById(id);
    const board = await findBoard(todo.boardId);

    if (req.user._id === board.userId.toString()) {
      cleanList.push(id);
    }
  }

  const result = await deleteTodos(cleanList);
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.message);

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
