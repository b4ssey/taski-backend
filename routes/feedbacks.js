const express = require("express");
const { Feedback, validate } = require("../models/feedback");
const router = express.Router();
const nodemailer = require("../startup/nodemailer");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body.name, req.body.comment);
  if (error) res.status(400).send(error.details[0].message);

  let feedback = new Feedback({
    name: req.body.name,
    comment: req.body.comment,
  });

  await feedback.save();
  res.send(feedback);

  nodemailer.sendFeedback(feedback.name, feedback.comment);
});

module.exports = router;
