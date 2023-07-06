const express = require("express");
const {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodos,
} = require("../todo/todoRepository");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const boardId = req.params.id;
  const list = await getTodoList(boardId);
  res.status(200).send(list);
});

router.post("/", async (req, res) => {
  const obj = {
    task: req.body.task,
    dueDate: req.body.dueDate,
    boardId: req.body.boardId,
    dateCreated: new Date(),
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
