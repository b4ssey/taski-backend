const config = require("config");

module.exports = function () {
  console.log("na him", config.get("jwtPrivateKey"), config.get("pass"));
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
