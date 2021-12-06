const express = require('express');
const blogController = require('./../controller/blogController');
const commentRoutes = require('./../routes/commentRoutes');
const ratingRoutes = require('./../routes/ratingRoutes');
const userController = require('./../controller/userController');
const router = express.Router();

router.use('/:blogId/comment', commentRoutes);
router.use('/:blogId/rating', ratingRoutes);

// router.use(userController.authHandler);

router.route('/').get(blogController.getAllBlogs);
router.route('/:id').get(blogController.getBlog);
module.exports = router;
