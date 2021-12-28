const express = require("express");
const { Todo, validate } = require("../models/todo");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort("-dateChosen");
  res.send(todos);
});

router.post("/", async (req, res) => {
  let { title, note, tag, oneTime, dateChosen } = req.body;
  const { error } = validate(title, note, tag, oneTime, dateChosen);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({
    title,
    notr,
    tag,
    oneTime,
    dateChosen,
  });
  await todo.save();
  res.send(todo);
});
