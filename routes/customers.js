/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');

const Customer = require('../models/customersModels');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});
router.post('/', async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    // isGold: req.body.isGold,
  });
  try {
    customer = await customer.save();
  } catch (err) {
    res.status(400).send('Number is Already exist');
  }
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const customer = await Customer.findById(req.params.id);

  updates.forEach((update) => {
    customer[update] = req.body[update];
  });
  const data = await customer.save();
  if (!data)res.status(404).send('the course with given id not found');// 404

  res.send(data);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)res.status(404).send('the course with given id not found');// 404

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)res.status(404).send('the course with given id not found');// 404
  res.send(customer);
});

module.exports = router;
