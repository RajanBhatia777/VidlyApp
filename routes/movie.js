/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const express = require('express');
const { object } = require('joi');
const Movie = require('../models/movie');
const { Genre } = require('../models/genresModels');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Movie.find().sort('name');
  res.send(data);
});
router.post('/', async (req, res) => {
  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send('invalid genre.');

  let data = new Movie({
    title: req.body.title,
    genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  data = await data.save();
  res.send(data);
});

router.put('/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  const movie = await Movie.findById(req.params.id);
  updates.forEach((update) => {
    movie[update] = req.body[update];
  });
  const data = await movie.save();
  if (!data)res.status(404).send('the course with given id not found');// 404

  res.send(data);
});

router.delete('/:id', async (req, res) => {
  const data = await Movie.findByIdAndRemove(req.params.id);
  if (!data)res.status(404).send('the course with given id not found');// 404

  res.send(data);
});

router.get('/:id', async (req, res) => {
  const data = await Movie.findById(req.params.id);

  if (!data)res.status(404).send('the course with given id not found');// 404
  res.send(data);
});
module.exports = router;
