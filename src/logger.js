const winston = require("winston");

const Logger = (logLevel) => {
  return winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });
};

module.exports = Logger;
