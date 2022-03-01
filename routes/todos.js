const express = require("express");
const { Todo, validate, validateUser } = require("../models/todo");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find().sort("-dateChosen");
  res.send(todos);
});

router.get("/:owner", auth, async (req, res) => {
  let { owner } = req.params;
  const { error } = validateUser(owner);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(owner);
  if (!user) return res.status(400).send("Invalid user.");

  const todos = await Todo.find({ "owner._id": user }).sort("-dateChosen");
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

router.put("/:id", auth, async (req, res) => {
  let { title, note, tag, oneTime, dateChosen, owner } = req.body;
  const { error } = validate(title, note, tag, oneTime, dateChosen, owner);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title,
      note,
      tag,
      oneTime,
      dateChosen,
    },
    { new: true }
  );

  if (!todo)
    return res.status(404).send("The Todo with the given ID not found");

  res.send(todo);
});

router.delete("/:uId/:tId", auth, async (req, res) => {
  let { uId, tId } = req.params;
  const { error: userErr } = validateUser(uId);

  if (userErr) return res.status(400).send(error.details[0].message);

  const user = await User.findById(uId);
  if (!user) return res.status(400).send("Invalid user.");

  const { error: todoErr } = validateUser(tId);
  if (todoErr) return res.status(400).send(error.details[0].message);

  const todo = await Customer.findByIdAndRemove(tId);
  if (!todo) return res.status(400).send("Invalid todo.");

  res.send(todo);
});

module.exports = router;
