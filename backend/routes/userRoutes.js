const express = require('express');
const router = express.Router();
const userController = require('./../controller/userController');

router.route('/signup').post(userController.signUp);
router.route('/login').post(userController.login);
router
  .route('/updateMe')
  .patch(
    userController.authHandler,
    userController.uploadUserPhoto,
    userController.updateMe
  );

module.exports = router;
