const Product = require('../model/productModel');
const User = require('../model/userModel');
const Wishlist = require('../model/wishlistModel');
const Review = require('../model/reviewModel');
const Order = require('../model/orderModel');
const AdminOrder = require('../model/adminOrderModel');
const catchAsync = require('../util/catchAsync');

let item_per_page = 10

exports.getHome = catchAsync(async (req,res,next) =>{
    const page = req.query.page*1 || 1
    const productLength = await Product.countDocuments();
    const products = await Product.aggregate([
        {
            $sample:{size:productLength}
        }
    ]).skip((page-1)*item_per_page).limit(item_per_page);
    res.render('shop/home',{
        title:'Home',
        path:'/',
        currentPage:page,
        hasNextPage:item_per_page*page < productLength,
        hasPrevPage:page>1,
        nextPage:page+1,
        prevPage:page-1,
        lastPage:Math.ceil(productLength/item_per_page),
        products
    })
});

exports.getProduct = catchAsync(async(req,res,next) =>{
    const product = await Product.findOne({slug:req.params.slug}).populate({
        path:'reviews',
        fields:'review user rating '
    }).populate('brand','name');

    res.render('shop/product',{
        title:product.name,
        path:`/product/${product.slug}`,
        product
    })
});

exports.getCategories =  catchAsync( async (req,res,next)=>{
    const categories = Product.schema.path('category').enumValues;
    res.render('shop/category',{
        title:'categories',
        path:'/categories',
        categories
    })
});

exports.getCategory = catchAsync(async(req,res)=>{
    const page = req.query.page*1 || 1
    const productLength = (await Product.find({category:req.params.category})).length;
    const products = await Product.aggregate([
        {
            $match:{category:req.params.category}
        },
        {
            $sample:{size:productLength}
        }
    ]).skip((page-1)*item_per_page).limit(item_per_page);
    res.render('shop/categoryProd',{
        title:req.params.category,
        path:`/categories/${req.params.category}`,
        currentPage:page,
        hasNextPage:item_per_page*page < productLength,
        hasPrevPage:page>1,
        nextPage:page+1,
        prevPage:page-1,
        lastPage:Math.ceil(productLength/item_per_page),
        products
    })
})

exports.getLogin = catchAsync(async(req,res,next) =>{
    res.render('auth/login',{
        title:'login'
    })
})

exports.getCart = catchAsync(async(req,res,next)=>{
    const user = await User.findById(res.locals.user).populate('cart.items.product','name images price slug');
    const cart = user.cart.items;
    res.render('shop/cart',{
        path:'/your-cart',
        cart
    })
});

exports.getWishList = catchAsync( async (req,res,next) =>{
    const wishlist = await Wishlist.find({user:res.locals.user});
    res.render('shop/wishlist',{
        path:'/your-wishlist',
        wishlist
    })
})

exports.addProduct = (req,res,next)=>{
    res.render('admin/add-product',{
        path:'/add-product'
    })
}

exports.postProd = catchAsync(async(req,res,next)=>{
    await Product.create({
        brand:(req.user.id||res.locals.user),
        name:req.body.name,
        price:req.body.price,
        highligth:req.body.highligth,
        overview:req.body.overview,
        category:req.body.category,
        images:req.body.images
    })
    res.redirect('/')
})

exports.getMyProd = catchAsync(async(req,res,next)=>{
    const products = await Product.find({brand:res.locals.user});
    res.render('admin/get-my-products',{
        title:'my-products',
        path:'/my-products',
        products
    })
})

exports.getEditProd = catchAsync(async(req,res,next)=>{
    const product = await Product.findById(req.params.productId);
    res.render('admin/edit-product',{
        path:`/edit-product/${product._id}`,
        product
    })
})

exports.postEditProd = catchAsync(async(req,res,next) =>{
    const prodId = req.body.productId
    let product = await Product.findByIdAndUpdate(prodId,req.body,{
        new:true,
        runValidators:true
    });
    if(!req.body.images){
        req.body.images = product.images
    }
    res.redirect('/my-products')

})

exports.updateInfo = catchAsync(async (req,res,next) =>{
    res.render('auth/update-info',{
        path:'/update-info'
    })
})

exports.updatePassword = catchAsync((req,res,next) =>{
    res.render('auth/update-password',{
        path:'update-password'
    })
})

exports.getSearch = catchAsync(async(req,res,next) =>{
    const Psearch = req.query.Psearch;
    let products = await Product.find({ $text: { $search: Psearch } })
    if(products.length === 0){
        products = await Product.find().where('category').equals(Psearch)
    }
    res.render('shop/result-search',{
        path:`/search-result/?Psearch=${Psearch}`,
        products
    })
})

exports.getForgetPassword = catchAsync((req,res,next)=>{
    res.render('auth/forgetPassword',{
        path:'/forget-password'
    })
})

exports.getResetPassword = catchAsync((req,res,next)=>{
    res.render('auth/resetPassword',{
        path:'/reset-password'
    })
})

exports.getSignup = catchAsync((req,res,next) =>{
    res.render('auth/signup',{
        paht:'/signup'
    })
})

exports.getAddReview = catchAsync(async(req,res,next) =>{
    const product = await Product.findById(req.params.productId);
    res.render('shop/rating',{
        product
    })
})

exports.getEditReview = catchAsync(async(req,res,next) =>{
    const review = await Review.findById(req.params.reviewId);
    res.render('shop/edit-review',{
        review
    })
})

exports.getCheckOutSuccess = catchAsync(async(req,res,next)=>{
    const orders = await Order.find({user:res.locals.user});
    res.render('shop/checkOutSuccess',{
        orders
    })
})

exports.getAdminOrders = catchAsync(async(req,res,next)=>{
    res.render('admin/orders',{
        orders
    })
})