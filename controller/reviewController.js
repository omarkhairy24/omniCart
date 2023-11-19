const Review = require('../model/reviewModel');
const AppError = require('../util/AppError');

exports.getReviews = async(req,res,next)=>{
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({product:productId})
        res.status(200).json({
            status:'success',
            data:{
                reviews
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.addReview = async (req,res,next) =>{
    try {
        if(!req.body.productId) req.body.productId = req.params.productId;
        if(!req.body.user) req.body.user = (req.user.id);
        const review = await Review.create(req.body);
        res.status(200).json({
            status:'succes',
            data:{
                review
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.updateReview = async (req,res,next) =>{
    try {
        const reviewId = req.params.reviewId
        let review = await Review.findById(reviewId);

        if(review.user._id.toString()!== req.user.id.toString() ){
            return next(new AppError('not authorized',403))
        }

        review = await Review.findByIdAndUpdate(reviewId,req.body,{
            new:true,
            runValidators:true
        })

        res.status(201).json({
            status:'success',
            data:{
                review
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteReview = async(req,res,next) =>{
    try {
        const reviewId = req.params.reviewId
        let review = await Review.findById(reviewId);
    
        if(review.user._id.toString()!== (req.user.id)){
            return next(new AppError('not authorized',403))
        }
    
        review = await Review.findByIdAndDelete(reviewId);
        res.status(200).json({
            status:'success'
        })
    } catch (error) {
        next(error)
    }
}