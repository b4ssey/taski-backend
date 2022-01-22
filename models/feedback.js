const mongoose = require("mongoose");
const Joi = require("joi");

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 75,
    },
    comment: {
      type: String,
      required: true,
      minlength: 25,
      maxlength: 150,
    },
  })
);

function validateFeedback(nm, cmmnt) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    comment: Joi.string().min(25).max(150).required(),
  });
  return schema.validate({ name: nm, comment: cmmnt });
}

exports.Feedback = Feedback;
exports.validate = validateFeedback;
