const Cart = require('./../model/cartModel');
const Product = require('./../model/productModel');
const catchError = require('./../utils/catchError');
const AppError = require('./../utils/appError');

exports.cartHandler = catchError(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'this product dose not exist',
    });
  }
  const currentCart = await Cart.findOne({ userId: userId });
  if (!currentCart) {
    const cart = await Cart.create({
      userId: userId,
      products: [
        {
          productId: productId,
          quantity: quantity,
          price: price,
        },
      ],
    });
    res.status(200).json({
      status: 'success',
      data: {
        cart: cart,
      },
    });
  } else {
    let itemIndex = currentCart.products.findIndex(
      (el) => el.productId.toString() === productId
    );
    if (itemIndex !== -1) {
      currentCart.products[itemIndex].quantity += quantity;
      currentCart.products[itemIndex].price = price;
    } else {
      currentCart.products.push({ productId, quantity, price });
    }
    await currentCart.save();
    res.status(200).json({
      status: 'success',
      data: {
        cart: currentCart,
      },
    });
  }
});

exports.deleteProductInCart = catchError(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  const currentCart = await Cart.findOne({ userId: userId });
  const result = currentCart.products.filter((el) => {
    return el.productId.toString() !== productId;
  });
  console.log(result);
  currentCart.products = result;
  await currentCart.save();
  res.status(200).json({
    status: 'success',
    data: {
      cart: currentCart,
    },
  });
});

exports.getUserCart = catchError(async (req, res, next) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId }).populate({
    path: 'products.productId',
    select: 'name price photo _id ',
  });
  res.status(200).json({
    status: 'success',
    data: {
      cart: cart,
    },
  });
});
