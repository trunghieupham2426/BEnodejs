const express = require('express');
const commentController = require('./../controller/commentController');
const userController = require('./../controller/userController');

const router = express.Router({ mergeParams: true });

router.use(userController.authHandler);

router.route('/').post(commentController.postComment);

module.exports = router;
