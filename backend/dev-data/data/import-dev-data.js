const mongoose = require('mongoose');
const dotenv = require('dotenv'); //npm i dotenv
const fs = require('fs');
const User = require('./../../model/UserModel');
const Blog = require('../../model/BlogModel');
const Comment = require('../../model/CommentModel');

// config before require app
dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE_LOCAL;
// connect mongoose to database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection');
  });
// read json file

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/blogs.json`, 'utf8'));
const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/comments.json`, 'utf8')
);

//import data to database
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Blog.create(blogs, { validateBeforeSave: false });
    await Comment.create(comments, { validateBeforeSave: false });
    console.log('data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// delete all data from database
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
    await Comment.deleteMany();
    console.log('data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// console.log(process.argv);
if (process.argv[2] === '--import') {
  importData(); //node ./backend/dev-data/data/import-dev-data.js --import
}
if (process.argv[2] === '--delete') {
  deleteData(); //node ./backend/dev-data/data/import-dev-data.js --delete
}
