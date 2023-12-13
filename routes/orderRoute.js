const router = require('express').Router();
const authController = require('../controller/authController');
const orderController = require('../controller/orderController');

router.get('/my-orders',authController.protect,orderController.getOrders);

router.post('/add-order',authController.protect,orderController.addOrder);

module.exports = router