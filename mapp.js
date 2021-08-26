const express = require('express');
const logger = require('./logger');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});
app.use(logger);

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },

];

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)res.status(404).send('the course with given id not found');// 404
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)res.status(404).send('the course with given id not found');// 404
  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)res.status(404).send('the course with given id not found');// 404
  res.send(course);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}...`));

// How to set environment variable
