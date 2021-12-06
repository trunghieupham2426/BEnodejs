const express = require('express');
const productController = require('./../controller/productController');
const userController = require('./../controller/userController');
const multer = require('multer');

const router = express.Router();
router.get('/home-product', productController.getRandomProduct);

router.use(userController.authHandler);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.uploadProductPhoto, productController.createProduct);

router.get('/my-product', productController.getMyProducts);

router
  .route('/:id')
  .delete(productController.deleteMyProduct)
  .patch(productController.uploadProductPhoto, productController.editMyProduct)
  .get(productController.getOneProduct);

module.exports = router;
