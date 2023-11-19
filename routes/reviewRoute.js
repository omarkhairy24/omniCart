const router = require('express').Router({mergeParams:true});
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

router.get('/',reviewController.getReviews);

router.post('/add-review',authController.protect,authController.restrictTo('user'),reviewController.addReview)

router.patch('/:reviewId',authController.protect,authController.restrictTo('user'),reviewController.updateReview);

router.delete('/:reviewId',authController.protect,authController.restrictTo('user'),reviewController.deleteReview);

module.exports = router;