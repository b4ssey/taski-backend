const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.isSchema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  isVerified: { type: Boolean, default: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(nm, ml, psswrd) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity({
      min: 5,
      max: 1024,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
    }),
  });

  return schema.validate({
    name: nm,
    email: ml,
    password: psswrd,
  });
}

exports.User = User;
exports.validate = validateUser;