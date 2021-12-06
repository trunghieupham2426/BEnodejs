const express = require('express');
const userController = require('./../controller/userController');
const cartController = require('./../controller/cartController');

const router = express.Router();

router.use(userController.authHandler);

router.post('/', cartController.cartHandler);
router.get('/:userId', cartController.getUserCart);
router.patch('/', cartController.deleteProductInCart);

module.exports = router;
