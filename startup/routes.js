const express = require("express");
const todos = require("../routes/todos");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/todos", todos);
  // app.use("/", home);
  // app.use(error);
};
