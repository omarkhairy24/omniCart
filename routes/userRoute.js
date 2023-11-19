const userController = require('../controller/userController');
const authController = require('../controller/authController')
const router = require('express').Router();

router.get('/search-users',userController.getUsers);

router.get('/search-user/:id',userController.getUser);

router.patch('/update-user',authController.protect,userController.updateUser);

router.delete('/delete-me',authController.protect,userController.deactivateUser);

module.exports = router;