const path = require("path");
const scanners = require("./controllers/scanners");
const shop = require("./controllers/shop");
const auth = require("./controllers/authRedirect");
const requestAuthToken = require("./controllers/requestAuthToken");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
  });
  app.get("/scanners", scanners);
  app.get("/shop", shop);
  app.get("/oauth-callback", requestAuthToken);
  app.get("/auth", auth);
};
