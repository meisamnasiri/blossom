const express = require("express");
const {
  getTodoList,
  createTodo,
  updateTodo,
} = require("../todo/todoRepository");

const router = express.Router();

router.get("/list/:id", async (req, res) => {
  const boardId = req.params.id;
  const list = await getTodoList(boardId);
  res.status(200).send(list);
});

router.post("/", async (req, res) => {
  const todo = await createTodo(req.body);
  res.status(200).send(todo);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteTodo(id);
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  const obj = req.body;
  const result = await updateTodo(obj);
  res.status(200).send(result);
});

module.exports = router;
