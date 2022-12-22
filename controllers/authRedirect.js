const { HOST, PORT, AUTH_URL, CLIENT_ID } = process.env;
const REDIRECT_URI = `http://${HOST}:${PORT}/oauth-callback`;

const auth = (req, res) => {
  res.redirect(
    `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`
  );
};

module.exports = auth;
