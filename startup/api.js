const express = require("express");
const todo = require("../routes/todo");
const board = require("../routes/board");
const user = require("../routes/user");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/todo", todo);
  app.use("/api/board", board);
  app.use("/api/user", user);
};
