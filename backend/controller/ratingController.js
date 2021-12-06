const Rating = require('../model/ratingModel');
const AppError = require('./../utils/appError');
const catchError = require('./../utils/catchError');

exports.ratingBlog = catchError(async (req, res, next) => {
  //   console.log(req.user);
  const currentRating = await Rating.create({
    rating: req.body.rating,
    author: req.user.id,
    blog: req.params.blogId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: currentRating,
    },
  });
});
