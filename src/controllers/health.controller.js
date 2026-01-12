const env = require("../config/env");

exports.health = (req, res) => {
  res.json({
    status: "ok",
    app: env.APP_NAME,
    env: env.NODE_ENV,
    time: new Date().toISOString(),
  });
};