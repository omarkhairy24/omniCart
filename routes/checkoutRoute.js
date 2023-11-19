const authController = require('../controller/authController');
const checkoutController = require('../controller/checkoutController');
const router = require('express').Router();

router.get('/add-check-out',authController.protect,checkoutController.getCheckOutSession);

module.exports = router