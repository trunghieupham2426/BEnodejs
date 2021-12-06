const mongoose = require('mongoose');
const User = require('./userModel');
const Blog = require('./blogModel');
const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: [1, 'rating must be above 1'],
      max: [5, 'rating must be below 5'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
    },
  },
  { timestamps: true }
);

ratingSchema.index({ blog: 1, author: 1 }, { unique: true });
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
