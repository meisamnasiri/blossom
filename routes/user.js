const express = require("express");
const {
  registerUser,
  deleteUser,
  updateUser,
  findUser,
} = require("../user/userRepository");
const { validateUser } = require("../user/userModel");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {
    _id: req.body._id,
    email: req.body.email,
  };
  const user = await findUser(filter);
  res.status(200).send({ _id: user._id, name: user.name, email: user.email });
});

router.post("/", async (req, res) => {
  const obj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    repeatPassword: req.body.repeatPassword,
  };

  const { error } = validateUser(obj, "post");
  if (error) return res.status(400).send(error.message);

  const user = await registerUser(obj);
  const token = user.generateAuthToken();

  res
    .status(200)
    .header("x-auth-token", token)
    .send({ name: user.name, email: user.email });
});

router.delete("/", auth, async (req, res) => {
  const userId = req.user._id;
  const result = await deleteUser(userId);
  res.status(200).send(result);
});

router.put("/", auth, async (req, res) => {
  const obj = {
    _id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    repeatPassword: req.body.repeatPassword,
  };
  let user = await findUser(obj);
  if (!user) return res.status(400).send("No such user exists.");

  const { error } = validateUser(obj, "put");
  if (error) return res.status(400).send(error.message);

  const result = await updateUser(obj);
  res.status(200).send(result);
});

module.exports = router;
