/* eslint-disable max-len */
const express = require('express');
const joi = require('joi');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userMOdel');

router.get('', async (req, res) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email });

  const compare = await bcrypt.compare(password, data.password);
  if (compare == false) {
    return res.status(400).send('login failed');
  }
  const token = data.generateAuthToken();

  res.header('x-Auth-Token', token).send(data);
});
router.get('/:id', async (req, res) => {
  const data = await Genre.findById(req.params.id);
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
  // eslint-disable-next-line no-undef
  const data = await Genre.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true });
  res.send(data);
});

const validate = (genre) => {
  const schema = joi.object({ name: joi.string().min(3).required() });
  const error = schema.validate(genre);

  return error;
};
module.exports = router;
