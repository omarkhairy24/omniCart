const mongoose = require('mongoose');

const wishlistModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    }
});

wishlistModel.pre(/^find/,function(next){
    this.populate({
        path:'product',
        select:'name images price slug disPercentage updateDisTime discount ratingAverage ratingQuantity'
    })
    next();
})

wishlistModel.index({user:1,product:1},{unique:true});

module.exports = mongoose.model('Wishlist',wishlistModel);