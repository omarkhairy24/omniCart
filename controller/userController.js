const User = require('../model/userModel');
const AppError = require('../util/AppError');
const Address = require('../model/addressModel');

const filterObj = (req,...allowedFields)=>{
    const newObj = {};
    Object.keys(req).forEach(el=>{
        if(allowedFields.includes(el)){
            newObj[el] = req[el]
        }
    });

    return newObj
}

exports.getUsers = async(req,res,next)=>{
    try {
        const users = await User.find({role:'company'});
        res.status(200).json({
            status:'success',
            data:{
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.getUser = async(req,res,next)=>{
    try {
        const users = await User.findById({_id:req.params.id , role:'company'}).populate('products wishlists cart');
        res.status(200).json({
            status:'success',
            data:{
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req,res,next)=> {
    try {
        if(req.body.password||req.body.confirmPassword){
            return next(new AppError('not allowed',500))
        }

        const filterBody = filterObj(req.body,'name','email');
        let user  = await User.findByIdAndUpdate(req.user.id ,filterBody,{
            new:true,
            runValidators:true
        })
        res.status(201).json({
            status:'success',
            data:{
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.deactivateUser = async(req,res,next) =>{
    try {
        await User.findByIdAndUpdate(req.user.id,{active:false})
        res.status(200).json({
            status:'success'
        })
    } catch (error) {
        next(error)
    }
}

exports.addAddress = async (req,res,next)=>{
    try {
        const address = await Address.create({
            user:req.user.id,
            name:req.query.name,
            country:req.query.country,
            city:req.query.city,
            street:req.query.street,
            street2:req.query.street2,
            zipcode:req.query.zipcode
        })
        const user = await User.findById(req.user.id);
        user.phoneNumber = req.query.phoneNumber
        await user.save({validateModifiedOnly:true});
        res.status(201).json({
            status:'success',
            address
        })

    } catch (error) {
        next(error)
    }
}

exports.editAddress = async(req,res,next)=>{
    try {
        const address = await Address.findById(req.params.id)
        if(address.user._id.toString() !== req.user.id){
            return next(new AppError('not authorized',403))
        }
        await Address.findByIdAndUpdate(req.params.id,req.query,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:'success',
            address
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteAddress = async(req,res,next)=>{
    const address = await Address.findById(req.params.id)
    if(address.user._id.toString() !== req.user.id){
        return next(new AppError('not authorized',403))
    }
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:'success'
    })
}

exports.getUserAddress = async (req,res,next)=>{
    const user = await User.findById(req.user.id).populate('location');
    res.status(200).json({
        address:user.location,
        phoneNumber:user.phoneNumber
    })
}