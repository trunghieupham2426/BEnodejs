const mongoose = require('mongoose');
const User = require('./userModel');
const Comment = require('./commentModel');
const Rating = require('./ratingModel');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      require: [true, 'A blog must have a title'],
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    photo: {
      type: String,
      require: [true, 'the blog must have a photo'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      // set: function (val) {
      //   return Math.round(val * 10) / 10;
      // },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: { virtuals: true }, // virtuals not virtual , virtual will not working
    toObject: { virtuals: true },
  }
);

blogSchema.pre(/^find/, function (next) {
  // this.populate('comments').populate('rating');
  this.populate({
    path: 'comments',
    select: '-blog -__v',
  })
    .populate({
      path: 'rating',
      select: 'rating -blog',
    })
    .populate('user');
  next();
});
// blogSchema.virtual('comments', {
//   ref: 'Comment',
//   foreignField: 'blog',
//   localField: '_id',
// });

blogSchema.virtual('rating', {
  ref: 'Rating',
  foreignField: 'blog',
  localField: '_id',
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
