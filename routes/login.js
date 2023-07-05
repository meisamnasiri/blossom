const express = require("express");
const { findUser } = require("../user/userRepository");
const bcrypt = require("bcrypt");

const router = express.Router();

// Login request
router.post("/", async (req, res) => {
  const filter = {
    email: req.body.email,
  };
  const user = await findUser(filter);
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
