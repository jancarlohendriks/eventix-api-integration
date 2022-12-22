const axios = require("axios");
const path = require("path");

const { HOST, PORT, AUTH_URL, ACCESS_URL, CLIENT_ID, CLIENT_SECRET } =
  process.env;

const scanners = (req, res) => {
  const auth = req.cookies.auth;

  axios({
    method: "get",
    url: "https://api.eventix.io/3.0.0/scanner",
    headers: { Authorization: decodeURIComponent(auth) },
  })
    .then((data) => res.json(data.data))
    .catch((err) => res.status(500).json(err));
};

module.exports = scanners;
