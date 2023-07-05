const express = require("express");
const {
  registerUser,
  deleteUser,
  updateUser,
  findUser,
} = require("../user/userRepository");
const auth = require("../middleware/auth");

const router = express.Router();

// Who uses this one?
router.get("/", async (req, res) => {
  const filter = {
    _id: req.body._id,
    email: req.body.email,
  };
  const user = await findUser(filter);
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const info = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await registerUser(info);
  res.status(200).send(user);
});

router.delete("/", auth, async (req, res) => {
  const userId = req.user._id;
  const result = await deleteUser(userId);
  res.status(200).send(result);
});

router.put("/", auth, async (req, res) => {
  const filter = {
    _id: req.user._id,
  };
  let user = await findUser(filter);
  if (!user) return res.status(400).send("No such user exists.");

  const userUpdate = {
    _id: filter._id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  user = await updateUser(userUpdate);
  res.status(200).send(user);
});

module.exports = router;
