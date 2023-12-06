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
        let wishList;
        if(!req.params.productId) req.params.productId = req.body.productId;
        const isFav = await Wishlist.findOne({product:req.params.productId,user:req.user.id});
        if(isFav){
            await Wishlist.findOneAndDelete({user:req.user.id,product:req.params.productId});
        }else{
            wishList = await Wishlist.create({
             user:req.user.id,
             product:req.params.productId,
             isFav:true
            })
        }
       res.status(200).json({
        status:'success',
        data:{
            wishList
        }
       })

    } catch (error) {
        next(error)
    }
}