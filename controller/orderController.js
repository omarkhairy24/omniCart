const User = require('../model/userModel');
const Order = require('../model/orderModel');
const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const crypto = require('crypto');

exports.addOrder = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user.id).populate('cart.items.product cat.items.owner');
    const cart = user.cart.items;
    let total = 0;
    cart.forEach(p =>{
        total += p.quantity + p.product.price
    });
    const orderInfo = cart.map(p=>{
        return {quantity:}
    })
})