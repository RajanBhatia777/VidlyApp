const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/population', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('Author', authorSchema);

const CourseSchema = new mongoose.Schema({
  name: String,
  author: authorSchema,

});

const Course = mongoose.model('Course', CourseSchema);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author', 'name bio website -_id')
    .select('name author');
  // .populate('category', 'name')
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

createCourse('Node Course', {
  _id:
   '61248f621c924316d039ba82',
  name: 'Mosh',
  bio: 'My bio',
  website: 'My Website',
});

// listCourses();
