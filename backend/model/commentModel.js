const mongoose = require('mongoose');
const Blog = require('./blogModel');
const User = require('./userModel');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'comment can not empty'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'comment must belong to a blog'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'comment must belong to a user'],
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
    },
    replies: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }], // Array of comment replies
  },
  { timestamps: true }
);

// Middleware to populate the replies when you call `find()`
commentSchema.pre(/^find/, function (next) {
  this.populate('replies').populate('author');

  next();
});

commentSchema.post('save', async function (doc, next) {
  const authorPromise = await User.findById(doc.author);

  doc.author = authorPromise;
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
