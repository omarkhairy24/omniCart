const userController = require('../controller/userController');
const authController = require('../controller/authController')
const router = require('express').Router();

router.get('/search-users',userController.getUsers);

router.get('/user-address',authController.protect,userController.getUserAddress);

router.get('/search-user/:id',userController.getUser);

router.patch('/update-user',authController.protect,userController.updateUser);

router.patch('/address',authController.protect,userController.addAddress);

router.delete('/delete-me',authController.protect,userController.deactivateUser);

module.exports = router;