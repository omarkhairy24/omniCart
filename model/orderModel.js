const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:'Product',
            required:true
        },
        owner:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalPrice:{
        type:Number,
        required:true
    }
});

orderModel.pre(/^find/,function(next) {
    this.populate({
        path:'user',
        select:'name email'
    }).populate({
        path:'products',
        populate:{
            path:'product'
        }
    })
    next();
})

module.exports = mongoose.model('Order',orderModel);