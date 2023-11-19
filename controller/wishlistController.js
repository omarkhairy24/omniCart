const Wishlist = require('../model/wishlistModel')
const AppError = require('../util/AppError');

exports.getWishlist = async(req,res,next)=>{
    try {
        const wishlists = await Wishlist.find({user:req.user.id});
        res.status(200).json({
            status:'success',
            data:{
                wishlists
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.addWishlist = async (req,res,next)=>{
    try {
        if(!req.params.productId) req.params.productId = req.body.productId;
       const wishlist = await Wishlist.create({
        user:req.user.id,
        product:req.params.productId
       })
       res.status(200).json({
        status:'success',
        data:{
            wishlist
        }
       })

    } catch (error) {
        next(error)
    }
}

exports.removeFromWishlist = async(req,res,next) =>{
    try {
        if(!req.params.productId) req.params.productId = req.body.productId;
        await Wishlist.findOneAndRemove({user:req.user.id,product:req.params.productId});
        res.status(200).json({
            status:'success'
        })

    } catch (error) {
        next(error)
    }
}