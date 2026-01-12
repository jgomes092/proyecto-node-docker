const app = require("./app");
const env = require("./config/env");
const logger = require("./utils/logger");

app.listen(env.PORT, () => {
  logger.info("Server started", { port: env.PORT, env: env.NODE_ENV });
});