const Blog = require('../model/blogModel');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');

exports.getAllBlogs = catchError(async (req, res, next) => {
  //paginate
  const limit = 3;
  const skip = (req.query.page - 1) * limit;
  //==========
  const blogs = await Blog.find().skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    data: {
      data: blogs,
    },
  });
});

exports.getBlog = catchError(async (req, res, next) => {
  const blogId = req.params.id;
  const blog = await Blog.findOne({ _id: blogId });

  // .populate('comments')
  // .populate('rating');

  if (!blog) {
    return next(new AppError('no blog founded', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      blog: blog,
    },
  });
});
