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
        enum:[{0:'packing'},{1:'shipping'},{2:'arriving'},{3:'success'}],
        default:'packing'
    },
    totalPrice:{
        type:Number,
        required:true
    }
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    timestamps:true
});

orderModel.virtual('orderAt').get(function(){
    return `${this.createdAt.getMonth()}-${this.createdAt.getDay()}-${this.createdAt.getFullYear()}`
})

module.exports = mongoose.model('Order',orderModel);