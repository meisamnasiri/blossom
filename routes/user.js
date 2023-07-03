const express = require("express");
const { registerUser } = require("../user/userRepository");

const router = express.Router();

router.post("/", async (req, res) => {
  const obj = req.body;
  const user = await registerUser(obj);
  res.status(200).send(user);
});

module.exports = router;
