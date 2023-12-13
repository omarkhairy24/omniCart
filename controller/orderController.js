const User = require('../model/userModel');
const Order = require('../model/orderModel');
const AppError = require('../util/AppError');
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
        uId:crypto.randomUUID(),
        products:orderInfo,
        totalPrice:total
    })
    res.status(201).json({
        order
    })
})


exports.getOrders = catchAsync(async (req,res,next)=>{
    const orders = await Order.find({user:req.user.id});
    res.status(200).json({
        orders
    })
})