const express = require("express");
const app = express();
require("./database")();

app.get("/", (req, res) => {
  res.status(200).send("hello, world!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
