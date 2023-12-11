const mongoose = require('mongoose');

const addressSchma = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    name:String,
    country:String,
    city:String,
    street:String,
    street2:String,
    zipcode:Number
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

addressSchma.pre(/^find/,function(next){
    this.populate('user');
    next();
})

addressSchma.virtual('phoneNumber').get(function(){
    return this.user.phoneNumber
})

module.exports = mongoose.model('Address',addressSchma)