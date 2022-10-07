// const http = require("http");
// const https = require("https");
// const fs = require("fs");
// const key = fs.readFileSync("./key.pem", "utf8");
// const cert = fs.readFileSync("./cert.pem", "utf8");
const path = require("path");

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { PORT, AUTH_URL, ACCESS_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const REDIRECT_URI = `http://localhost:${PORT}/oauth-callback`;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: true, allowedHeaders: true }));

// const httpServer = http.createServer(app);
// const server = https.createServer({ key: key, cert: cert }, app);

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

app.get("/oauth-callback", async (req, res) => {
  const code = req.query.code;
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = {
    grant_type: "authorization_code",
    redirect_uri: `http://localhost:${PORT}/oauth-callback`,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
  };

  await axios({
    method: "post",
    url: ACCESS_URL,
    headers: headers,
    data: body,
  })
    .then((response) => {
      console.log(response);
      res.json(response.data.access_token);
    })
    .catch((err) => res.status(500).json(err));

  // axios
  //   .post(ACCESS_URL, body)
  //   .then((response) => {
  //     console.log(response);
  //     res.json(response);
  //   })
  //   .catch((err) => res.status(500).json({ err }));

  // console.log(cookie);
  // res.send("hello");
});

app.listen(PORT, () => {
  console.log(`app listening on https://localhost:${PORT}`);
});
