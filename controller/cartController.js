const User = require('../model/userModel');
const Product = require('../model/productModel');
const AppError = require('../util/AppError');

exports.getCart = async(req,res,next) =>{
    try {

        const user = await User.findById(req.user.id).populate('cart.items.product','name images');
        const cart = user.cart;
        res.status(200).json({
            status:'success',
            data:{
                cart
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.addToCart = async (req,res,next) =>{
    try {
        const product = await Product.findById(req.params.id);
        const user = await User.findById(req.user.id);
        user.addToCart(product);
        res.status(200).json({
            status:'success',
            data:{
                cart : user.cart.items
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.increaseQuantity = async (req,res,next) =>{
    try {
        const product = await Product.findById(req.params.productId);
        const user = await User.findById(req.user.id);
        user.addToCart(product);
        res.status(200).json({
            status:'success',
            data:{
                cart : user.cart.items
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.removeFromCart = async(req,res) =>{
    try {
        const productId = req.params.productId
        const user = await User.findById(req.user.id);
        await user.removeFromCart(productId);
        res.status(200).json({
            status:'success',
            data:{
                cart:user.cart.items
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.controlQuantity = async (req,res) =>{
    try {
        const productId = req.params.productId
        const user = await User.findById(req.user.id);
        await user.reduceQuantity(productId);
        res.status(200).json({
            status:'success',
            data:{
                cart:user.cart.items
            }
        })

    } catch (error) {
        next(error)
    }
}