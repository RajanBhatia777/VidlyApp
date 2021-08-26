/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movie');
const rental = require('./routes/rentalRoutes');

const app = express();

mongoose.connect(process.env.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB'));
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rental);

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`listening on port ${port}...`));
