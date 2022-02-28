const mongoose = require("mongoose");
const Joi = require("joi");

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25,
    },
    note: {
      type: String,
      required: true,
      minlength: 25,
      maxlength: 50,
    },
    tag: {
      type: String,
      enum: ["urgent", "high", "normal", "low"],
      minlength: 4,
      maxlength: 10,
    },
    oneTime: {
      type: Boolean,
    },
    dateChosen: {
      type: Date,
      required: true,
    },
    owner: {
      type: new mongoose.Schema({
        name: { type: String, required: true, minlength: 5, maxlength: 50 },
      }),
      required: true,
    },
  })
);

function validateTodo(ttl, nt, tg, ntm, dt, oID) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(25).required(),
    note: Joi.string().min(5).max(50).required(),
    tag: Joi.string().valid("urgent", "high", "normal", "low"),
    oneTime: Joi.boolean(),
    dateChosen: Joi.date().required(),
    owner: Joi.objectId(),
  });
  return schema.validate({
    owner: oID,
    title: ttl,
    note: nt,
    tag: tg,
    oneTime: ntm,
    dateChosen: dt,
  });
}

function validateUser(oID) {
  const schema = Joi.object({ owner: Joi.objectId() });
  return schema.validate({ owner: oID });
}

exports.Todo = Todo;
exports.validate = validateTodo;
exports.validateUser = validateUser;
