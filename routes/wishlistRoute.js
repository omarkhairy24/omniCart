const authController = require('../controller/authController');
const wishlistController = require('../controller/wishlistController');
const router = require('express').Router();

router.get('/My-wishlist',authController.protect,authController.restrictTo('user'),wishlistController.getWishlist);

// router.post('/add-to-wishlist',authController.protect,authController.restrictTo('user'),wishlistController.addWishlist);

router.post('/add-to-wishlist/:productId',authController.protect,authController.restrictTo('user'),wishlistController.addWishlist);

// router.delete('/remove-from-list',authController.protect,authController.restrictTo('user'),wishlistController.removeFromWishlist);

router.delete('/remove-from-list/:productId',authController.protect,authController.restrictTo('user'),wishlistController.removeFromWishlist);

module.exports = router