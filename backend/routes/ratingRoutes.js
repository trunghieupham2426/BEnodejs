const express = require('express');
const ratingController = require('./../controller/ratingController');
const userController = require('./../controller/userController');

const router = express.Router({ mergeParams: true });
router.use(userController.authHandler);

router.post('/', ratingController.ratingBlog);

module.exports = router;
