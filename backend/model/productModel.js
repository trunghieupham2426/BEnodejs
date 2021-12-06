const mongoose = require('mongoose');
const User = require('./userModel');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: ['men', 'women', 'kid'],
      message: 'Please select correct category for product',
    },
  },
  brand: {
    type: String,
    required: [true, 'Please select brand for this product'],
    enum: {
      values: ['samsung', 'apple', 'nike'],
      message: 'Please select correct brand for product',
    },
  },
  status: {
    type: String,
    enum: ['new', 'sale'],
    default: 'new',
  },
  discount: {
    type: Number,
    min: [1, 'discount must be above 1'],
    max: [100, 'discount must be below 100'],
  },
  photo: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
    default: 'defaultPrd.jpeg',
  },
  description: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
