const router = require('express').Router();
const authController = require('../controller/authController');

router.post('/signup',authController.signup);

router.post('/login',authController.login);

router.get('/logout',authController.logout)

router.post('/forgetpassword',authController.forgetPassword);

router.post('/resetpassword',authController.resetPassword);

router.patch('/update-password',authController.protect,authController.updatePassword);

module.exports = router