const axios = require("axios");
const path = require("path");

const { HOST, PORT, ACCESS_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

const requestAuthToken = (req, res) => {
  const code = req.query.code;
  const body = {
    grant_type: "authorization_code",
    redirect_uri: `http://${HOST}:${PORT}/oauth-callback`,
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
      console.log(response.data);
      res.cookie("auth", `Bearer ${response.data.access_token}`);
      res.sendFile(path.join(__dirname, "../views/index.html"));
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = requestAuthToken;
