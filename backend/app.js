const express = require('express');
// const path = require('path');
const cors = require('cors');
// const bodyParser = require('body-parser');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');
const ratingRouter = require('./routes/ratingRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const globalError = require('./controller/globalError');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const app = express();

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public'))); //using access folder public
app.use(express.static(`${__dirname}/public`));
app.use(express.json()); //using middleware , need to access req.body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

//Handling Unhandled Routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: '404 Not Found',
  //   message: `cant find ${req.originalUrl} on this server`,
  // });
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

module.exports = app;
