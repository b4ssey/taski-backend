const express = require("express");
const { Todo, validate } = require("../models/todo");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find().sort("-dateChosen");
  res.send(todos);
});

router.post("/", auth, async (req, res) => {
  let { title, note, tag, oneTime, dateChosen, owner } = req.body;
  const { error } = validate(title, note, tag, oneTime, dateChosen, owner);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(owner);
  if (!user) return res.status(400).send("Invalid user.");

  let todo = new Todo({
    title,
    note,
    tag,
    oneTime,
    dateChosen,
    owner: {
      _id: user._id,
      name: user.name,
    },
  });
  await todo.save();
  res.send(todo);
});

module.exports = router;
