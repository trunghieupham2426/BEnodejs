const mongoose = require('mongoose');
const Product = require('./productModel');

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'quantity must be above 0'],
          max: [10, 'quantity must be below 11'],
          default: 1,
        },
        price: Number,
      },
    ],
    totalQty: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

CartSchema.pre('save', function (next) {
  next();
});

CartSchema.pre('save', function (next) {
  this.totalQty = this.products.reduce((acc, obj) => {
    return acc + obj.quantity;
  }, 0);
  this.totalPrice = this.products.reduce((acc, obj) => {
    return acc + obj.price * obj.quantity;
  }, 0);

  next();
});
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
