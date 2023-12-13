const userController = require('../controller/userController');
const authController = require('../controller/authController')
const router = require('express').Router();

router.get('/search-users',userController.getUsers);

router.get('/user-address',authController.protect,userController.getUserAddress);

router.get('/me',authController.protect,userController.getUserDetails);

router.get('/search-user/:id',userController.getUser);

router.patch('/update-user',authController.protect,userController.updateUser);

router.post('/address',authController.protect,userController.addAddress);

router.patch('/address/:id',authController.protect,userController.editAddress);

router.delete('/delete-me',authController.protect,userController.deactivateUser);

router.delete('/delete-address/:id',authController.protect,userController.deleteAddress);

module.exports = router;