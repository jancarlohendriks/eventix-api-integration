require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");

const { HOST, PORT } = process.env;

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

routes(app);

app.listen(PORT, () => {
  console.log(`app listening on http://${HOST}:${PORT}`);
});
