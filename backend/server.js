const mongoose = require('mongoose');
const dotenv = require('dotenv'); //npm i dotenv

dotenv.config({
  path: './config.env',
});
console.log(process.env.DATABASE_LOCAL);
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
  })
  .catch((err) => {
    //console.log(err);
  });

const app = require('./app');
// console.log(app.get('env'));

const port = 8000;
const server = app.listen(port, () => {
  console.log('app running');
});
