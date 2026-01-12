const logger = require("../utils/logger");
const env = require("../config/env");

module.exports = (err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: env.NODE_ENV === "production" ? undefined : err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({
    error: "INTERNAL_ERROR",
    message: env.NODE_ENV === "production" ? "Unexpected error" : err.message,
  });
};