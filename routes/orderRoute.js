const router = require('express').Router();
const authController = require('../controller/authController');
const orderController = require('../controller/orderController');

router.get('/my-orders',authController.protect,orderController.getOrders);

router.get('/order-detail/:id',authController.protect,orderController.getSingleOrder)

router.post('/add-order',authController.protect,authController.restrictTo('user'),orderController.addOrder);

router.delete('/delete-order/:orderId',authController.protect,orderController.deleteOrder);

module.exports = router