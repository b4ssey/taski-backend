const express = require("express");
const todos = require("../routes/todos");
const users = require("../routes/users");
const home = require("../routes/home");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/todos", todos);
  app.use("/api/users", users);
  app.use("/", home);
  app.use(error);
};
