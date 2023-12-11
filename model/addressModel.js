const mongoose = require('mongoose');

const addressSchma = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'USer',
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

module.exports = mongoose.model('Address',addressSchma)