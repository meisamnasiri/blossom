const express = require("express");
const app = express();

require("./startup/api")(app);
require("./startup/database")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

require("./reminder/reminder")();
