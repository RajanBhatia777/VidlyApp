const express = require('express');
const joi = require('joi');

const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/userMOdel');
const auth = require('../middleware/authMiddle');

router.get('', async (req, res) => {
  const data = await Genre.find().sort({ name: 1 });
  res.send(data);
});
router.get('/', auth, async (req, res) => {
  const decoded = jwt.verify(req.header('x-Auth-Token'), 'moshStupidCourse');
  const data = await User.findById(decoded._id);
  res.send(data);
});
router.post('', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const haspass = await bcrypt.hash(req.body.password, salt);

  req.body.password = haspass;
  const data = new User(req.body);
  let save;
  try {
    save = await data.save();
  } catch (error) {
    res.status(400).send(error.message);
  }
  res.send(save);
});

router.delete('/:id', async (req, res) => {
  const data = await Genre.findByIdAndRemove(req.params.id);
  res.send(data);
});

router.put('/:id', async (req, res) => {
  const data = await Genre.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true });
  res.send(data);
});

const validate = (genre) => {
  const schema = joi.object({ name: joi.string().min(3).required() });
  const error = schema.validate(genre);

  return error;
};
module.exports = router;
