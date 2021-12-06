const Comment = require('./../model/commentModel');
const Blog = require('./../model/blogModel');

const AppError = require('./../utils/appError');
const catchError = require('./../utils/catchError');

exports.postComment = catchError(async (req, res, next) => {
  if (!req.body.blog) req.body.blog = req.params.blogId;
  if (!req.body.author) req.body.author = req.user.id;
  // console.log(req.user);
  const newComment = await Comment.create(req.body);

  if (req.body.parentId) {
    const parentComment = await Comment.findById(req.body.parentId);
    parentComment.replies.push(newComment._id);
    parentComment.save();
  } else {
    const currentBlog = await Blog.findById(req.params.blogId);
    currentBlog.comments.push(newComment._id);
    currentBlog.save();
  }
  // console.log(req.user);
  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment,
    },
  });
});
