const path = require("path");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PORT, AUTH_URL, ACCESS_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const REDIRECT_URI = `http://localhost:${PORT}/oauth-callback`;

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/auth", (req, res) => {
  res.redirect(
    `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`
  );
});

app.get("/oauth-callback", (req, res) => {
  const code = req.query.code;
  const body = {
    grant_type: "authorization_code",
    redirect_uri: `http://localhost:${PORT}/oauth-callback`,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
  };
  axios({
    method: "post",
    url: ACCESS_URL,
    data: body,
  })
    .then((response) => {
      console.log(response);
      res.json(response.data);
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(PORT, () => {
  console.log(`app listening on https://localhost:${PORT}`);
});
