/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const express = require('express');
const { Genre } = require('../models/genresModels');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});
router.post('/', async (req, res) => {
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true,
  });
  if (!genre)res.status(404).send('the course with given id not found');// 404

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)res.status(404).send('the course with given id not found');// 404

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)res.status(404).send('the course with given id not found');// 404
  res.send(genre);
});
module.exports = router;
