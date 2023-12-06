const router = require('express').Router();
const productController = require('../controller/productController');
const authController = require('../controller/authController');
const reviewRoute = require('../routes/reviewRoute');

router.use('/:productId/reviews',reviewRoute);

router.get('/',productController.getAllProducts);

router.get('/search',productController.getSearch);

router.get('/sales',productController.getSalesProd);

router.get('/top-sales',productController.getTopSales);

router.get('/home',productController.getHome)

router.get('/:id',authController.isLoggedIn,productController.getProduct);

router.get('/categories',productController.getCategories);

router.get('/:category',productController.getCategory);

router.post('/add-product',authController.protect,authController.restrictTo('company'),productController.uploadImage,productController.resizeImage,productController.createProduct);

router.patch('/update-product/:id',authController.protect,productController.uploadImage,productController.resizeImage,productController.updateProduct);

router.patch('/add-discount/:id',authController.protect,authController.restrictTo('company'),productController.addDiscount);

router.patch('/remove-discount/:id',authController.protect,authController.restrictTo('company'),productController.removeDiscount);

router.delete('/delete-product',authController.protect,productController.deleteProduct);



module.exports = router;