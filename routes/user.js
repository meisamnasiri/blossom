const express = require("express");
const {
  registerUser,
  deleteUser,
  updateUser,
  findUser,
} = require("../user/userRepository");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await findUser(id);
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const obj = req.body;
  const user = await registerUser(obj);
  res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await deleteUser(userId);
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  const userId = req.body.id;
  const userUpdate = {
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const result = await updateUser(userUpdate);
  res.status(200).send(result);
});

module.exports = router;
