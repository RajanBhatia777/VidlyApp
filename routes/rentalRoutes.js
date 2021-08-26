/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const express = require('express');
const Rental = require('../models/rental');
const Customer = require('../models/customersModels');
const Movie = require('../models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Rental.find().sort('-dateOut');
  res.send(data);
});
router.post('/', async (req, res) => {
  const customer = await Customer.findById(req.body.customer);
  if (!customer) return res.status(400).send('Invalid Customer.');

  const movie = await Movie.findById(req.body.movie);
  if (!customer) return res.status(400).send('Invalid Movie.');

  if (movie.numberInStock === 0) {
    return res.status(400).send('movie out of stock.');
  }
  movie.numberInStock -= 1;
  movie.save();
  let data = new Rental({ customer, movie });
  data = await data.save();
  res.send(data);
});

router.put('/:id', async (req, res) => {
  const data = await Rental.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true,
  });
  if (!data)res.status(404).send('the course with given id not found');// 404

  res.send(data);
});

router.delete('/:id', async (req, res) => {
  const data = await Rental.findByIdAndRemove(req.params.id);
  if (!data)res.status(404).send('the course with given id not found');// 404

  res.send(data);
});

router.get('/:id', async (req, res) => {
  const data = await Rental.findById(req.params.id);

  if (!data)res.status(404).send('the course with given id not found');// 404
  res.send(data);
});
module.exports = router;
