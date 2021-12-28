const winston = require("winston");
// require("winston-mongodb");

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/logfile.log" }),
    // new winston.transports.MongoDB({
    //   db: "mongodb://localhost/vidly",
    // }),
  ],
  // exceptionHandlers: [
  //   new winston.transports.File({ filename: "logs/exceptions.log" }),
  // ],
  // rejectionHandlers: [
  //   new winston.transports.File({ filename: "logs/rejections.log" }),
  // ],
});
