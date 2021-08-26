const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  name: { type: String, minlength: 5, required: true },
  email: {
    type: String,
    unique: true,
    validate(value) {
      if (validator.isEmail(value) === false) {
        throw new Error('Email is not valid');
      }
    },
  },
  password: { type: String, required: true },
});
users.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'moshStupidCourse');
  return token;
};
const User = mongoose.model('User', users);
module.exports = User;
