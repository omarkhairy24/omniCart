const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:[true,'product must have a name'],
        minlength:4,
        text:true
    },
    slug:String,
    images:[{
        type:String,
    }],
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        validate:{
            validator:function(val){
                val < this.price
            },
            message:'discount must be less than the price'
        }
    },
    highligth:{
        type:String,
        required:[true,'product must have description']
    },
    overview:{
        type:String,
        required:true
    },
    ratingAverage:{
        type:Number,
        default:null,
        min:1,
        max:5,
        set: val => Math.round(val*10)/10
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        enum:['fashion','watches','footwear','laptops&computers','sports','home','mobiles'],
        required:[true,'product must havea category']
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

productSchema.pre('save' , function(next) {
    this.slug = slugify(this.name ,{lower:true})
    next();
});

// productSchema.pre(/^find/,function(next){
//     this.populate({
//         path:'brand',
//         select:'name'
//     });
//     next();
// })

productSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'product',
    localField:'_id'
})

module.exports = mongoose.model('Product',productSchema);