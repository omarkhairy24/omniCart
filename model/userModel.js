const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user must have a name'],
        text:true
    },
    email:{
        type:String,
        required:[true,'user must have email'],
        lowercase:true,
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(val){
                return val === this.password
            },
            message:'password not same,try again'
        }
    },
    role:{
        type:String,
        enum:['admin','user','company'],
        default:'user'
    },
    active:{
        type:Boolean,
        default:true
    },
    cart:{
        items:[{
            product:{
                type:mongoose.Schema.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }]
    },
    passordResetToken:String,
    passwordResetExpires:Date,
    passwordChangedAt:Date
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});



userSchema.virtual('wishlists',{
    ref:'Wishlist',
    foreignField:'user',
    localField:'_id'
})

userSchema.virtual('products',{
    ref:'Product',
    foreignField:'brand',
    localField:'_id'
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next()
})

userSchema.methods.correctPassword = async function(inputpassword,userpassord){
    return await bcrypt.compare(inputpassword,userpassord)
}

userSchema.methods.changePasswordAfter = function(jwtTimeStamp,){
    if(this.passwordChangedAt){
        const changeTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10)
        return jwtTimeStamp < changeTimeStamp;
    }
    return false;
}

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(3).toString('hex');
    this.passordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken;
}

userSchema.methods.addToCart = function(product){
    const productIndex = this.cart.items.findIndex(i =>{
        return i.product.toString() === product._id.toString()
    });
    let newQuantity = 1;
    let updatedCart = [...this.cart.items];

    if(productIndex >=0 ){
        newQuantity = this.cart.items[productIndex].quantity + 1;
        updatedCart[productIndex].quantity = newQuantity;
    }else{
        updatedCart.push({
            product:product._id,
            quantity:newQuantity
        })
    };
    this.cart ={
        items:updatedCart
    } ;
    return this.save({validateBeforeSave: false});
}

userSchema.methods.removeFromCart = function(productId){
    const updatedCart = this.cart.items.filter(i=>{
        return i.product.toString() !== productId.toString();
    });
    this.cart.items = updatedCart;
    return this.save({validateBeforeSave: false})
}

userSchema.methods.reduceQuantity = function(productId){
    const productIndex = this.cart.items.findIndex(i =>{
        return i.product.toString() === productId.toString()
    });

    let updatedCart = [...this.cart.items];
    let currentQuantity = updatedCart[productIndex].quantity;

    if(this.cart.items[productIndex].quantity > 1){
        currentQuantity = this.cart.items[productIndex].quantity - 1;
        updatedCart[productIndex].quantity = currentQuantity;
    }else{

        updatedCart = this.cart.items.filter(i=>{
            return i.product.toString() !== productId.toString();
        });
        this.cart.items = updatedCart;
    };
    this.cart = {
        items:updatedCart
    }

    return this.save({validateBeforeSave: false})
}

userSchema.methods.emptyCart = function(){
    this.cart.items = [];
    return this.save({validateBeforeSave: false})
}

userSchema.pre('save',function(next) {
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}});
    next();
});

module.exports = mongoose.model('User',userSchema);