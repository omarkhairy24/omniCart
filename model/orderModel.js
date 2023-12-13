const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    uId:{
        type:String
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
    orderStatus:{
        type:String,
        enum:[{'packing':0},{'shipping':1},{'arriving':2},{'success':3}],
        default:'packing'
    },
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