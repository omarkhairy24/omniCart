const authController = require('../controller/authController');
const cartController = require('../controller/cartController');
const router = require('express').Router();

router.get('/my-cart',authController.protect,authController.restrictTo('user'),cartController.getCart);

router.put('/add-to-cart/:id',authController.protect,authController.restrictTo('user'),cartController.addToCart);

router.put('/increase-quantity/:productId',authController.protect,authController.restrictTo('user'),cartController.increaseQuantity);

router.put('/decrease-quantity/:productId',authController.protect,authController.restrictTo('user'),cartController.controlQuantity);

router.delete('/remove-from-cart/:productId',authController.protect,authController.restrictTo('user'),cartController.removeFromCart);

module.exports = router;