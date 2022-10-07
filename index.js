const axios = require("axios");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { PORT, AUTH_URL, ACCESS_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const REDIRECT_URI = encodeURIComponent(
  `http://localhost:${PORT}/oauth-callback`
);

const app = express();
app.use(cors({ credentials: true, origin: true, allowedHeaders: true }));
// app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/auth", (req, res) => {
  res.redirect(
    `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
});

app.get("/oauth-callback", async (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));

  // const code = req.query.code;
  // // const cookie = req;
  // const opts = { headers: { accept: "application/json" } };
  // const body = {
  //   grant_type: "authorization_code",
  //   client_id: CLIENT_ID,
  //   client_secret: CLIENT_SECRET,
  //   code: code,
  //   redirect_uri: REDIRECT_URI,
  //   // scope: "public",
  //   // state: "active"
  // };

  // const params = new URLSearchParams();
  // params.append("grant_type", "authorization_code");
  // params.append("code", code);
  // params.append("redirect_uri", REDIRECT_URI);
  // params.append("client_id", CLIENT_ID);
  // params.append("client_secret", CLIENT_SECRET);
  // params.append("redirect_uri", REDIRECT_URI);

  // // const api_token = fetch(url, {
  // //   method: "post",
  // //   headers: {
  // //     "Content-Type": "application/x-www-form-urlencoded",
  // //   },
  // //   body: params,
  // // }).then((response) => {
  // //   res.json(response);
  // // });

  // axios({
  //   method: "post",
  //   url: `${ACCESS_URL}?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
  //   headers: {
  //     Accept: "application/json",
  //   },
  //   // headers: opts,
  // })
  //   .then((response) => {
  //     console.log(response);
  //     res.json(response);
  //   })
  //   .catch((err) => res.status(500).json(err));

  // // axios
  // //   .post(ACCESS_URL, body, opts)
  // //   .then((response) => {
  // //     console.log(response);
  // //     res.json(response);
  // //   })
  // //   .catch((err) => res.status(500).json({ err }));

  // // console.log(cookie);
  // // res.send("hello");
});

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
