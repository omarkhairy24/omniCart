const User = require('../model/userModel');
const Order = require('../model/orderModel');
const Product = require('../model/productModel');
const Wishlists = require('../model/wishlistModel');
const catchAsync = require('../util/catchAsync');
const crypto = require('crypto');

exports.addOrder = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user.id).populate('cart.items.product cart.items.owner');
    const cart = user.cart.items;
    let total = 0;
    cart.forEach(p =>{
        total += p.quantity + p.product.price
    });
    const orderInfo = cart.map(p=>{
        return {quantity:p.quantity , product:p.product._id,owner:p.owner}
    });
    const order = await Order.create({
        user:req.user.id,
        uId:crypto.randomBytes(5).toString('hex'),
        products:orderInfo,
        totalPrice:total
    })
    await user.emptyCart();
    res.status(201).json({
        status:'success',
        order
    })
})


exports.getOrders = catchAsync(async (req,res,next)=>{
    const orders = await Order.find({user:req.user.id});
    let totalQuantity = 0;
    orders.forEach(order =>{
        order.products.forEach(p=>{
            totalQuantity+=p.quantity
        })
    })
    res.status(200).json({
        orders,
        totalQuantity
    })
})

exports.getSingleOrder = catchAsync(async (req,res,next)=>{
    let totalItems = 0;
    const user = await User.findById(req.user.id).populate('location').select('-user.cart');
    const order = await Order.findById(req.params.id).populate({
        path:'products',
        populate:{
            path:'product'
        }
    }).populate({
        path:'user',
        select:'name email'
    })
    order.user.location = user.location
    order.products.forEach(p=>{
        totalItems += p.quantity
    })
    for(let i=0; i<order.products.length ; i++){
        const p = order.products[i];
        const product = await Product.findById(p.product._id);
        const wishList = await Wishlists.findOne({product:p.product._id,user:req.user.id});
        if(wishList){
            product.isFav = true
        }else{
            product.isFav = false
        }
        order.products[i].product = product
    }
    res.status(200).json({
        status:'sucess',
        order,
        totalItems
    })

})