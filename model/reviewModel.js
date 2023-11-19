const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

reviewSchema.index({product:1,user:1},{unique:true})

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name'
    });
    next();
})


reviewSchema.statics.calcAverage = async function(productId){
    const stats = await this.aggregate([
        {
            $match:{product:productId}
        },
        {
            $group:{
                _id:'$product',
                nRating:{$sum:1},
                avgRating:{$avg:'$rating'}
            }
        }
    ]);

    if(stats.length >0){
        await Product.findByIdAndUpdate(productId,{
            ratingAverage:stats[0].avgRating,
            ratingQuantity:stats[0].nRating
        })
    }else{
        await Product.findByIdAndUpdate(productId,{
            ratingAverage:null,
            ratingQuantity:0
        })
    }
}



reviewSchema.post('save',function(){
    this.constructor.calcAverage(this.product)
});

reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r = await this.clone().findOne();
    next();
});

reviewSchema.post(/^findOneAnd/,async function(){
    await this.r.constructor.calcAverage(this.r.product)
});

module.exports = mongoose.model('Review',reviewSchema);