const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, todoId }) => {
  return `${timestamp} [${level}] (${todoId}): ${message}`;
});

// Create the logger
const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(), // Output logs to the console
    new transports.File({ filename: "logs.log" }), // Output logs to a file
  ],
});

module.exports = logger;
