const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const sendMail = require('../email');
const crypto = require('crypto');
const AppError = require('../util/AppError');

const signToken = id =>{
    return jwt.sign({id} , process.env.JWT_SECRET,{
        expiresIn:'90d'
    })
};

const createSendToken = (user,statusCode,res) =>{
    const token = signToken(user._id);
    const cookieOption = {
        expires : new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),
        httpOnly : true
    };

    if(process.env.NODE_ENV === 'production') cookieOption.secure = true
    res.cookie('jwt',token,cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.restrictTo = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('not allowed',403))
        }
        next();
    }
};

exports.signup = async (req,res,next) =>{
    try {
        
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            role:req.body.role
        })

        createSendToken(user,201,res)        

    } catch (error) {
        next(error)
    }
}

exports.login = async (req,res,next) =>{
    try {
        
        const {email,password} = req.body
        if(!email || !password){
            return next(new AppError('no email or password provided',404))
        }
        const user = await User.findOne({email:email}).select('+password')
        if(!user){
            return next(new AppError('incorrect email',500))
        }
        if(! await user.correctPassword(password,user.password)){
            return next(new AppError('incorrect password',500))
        } 
        
        createSendToken(user,201,res)

    } catch (error) {
        next(error)
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true
    });
    res.redirect('/');
  };

exports.protect = async (req,res,next)=> {
    try {
        
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else if(req.cookies.jwt){
            token = req.cookies.jwt
        }

        if(!token){
            return next(new AppError('no token provided',500))
        }

        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return next(new AppError('user not found',404))
        }
        if(user.changePasswordAfter(decoded.iat)){
            return next(new AppError('invalid token',500))
        }
        req.user = user; 
        res.locals.user = user;
        next();

    } catch (error) {
        next(error)
    }
}

exports.isLoggedIn = async(req,res,next)=>{
    if(req.cookies.jwt){
        try {
            
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if(!user){
                return next();
            }
            if(user.changePasswordAfter(decoded.iat)){
                return next();
            }
            res.locals.user = user
            return next();

        } catch (error) {
            return next();
        }
    }
    next();
}

exports.forgetPassword = async (req,res,next) =>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new AppError('user not found',500))
    }

    const resetToken = user.createResetToken();
    await user.save({validateBeforeSave:false});
    const message = `your reset token ${resetToken.split('').join(' ')}`
    try {
       await sendMail({
        email:user.email,
        subject:`this is valid for 10 min`,
        message
       })

       res.status(200).json({
        status:'success',
        message:'token sent to your email.'
    })

    } catch (error) {
        user.passordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave:false});

       next(error)
    }
}

exports.resetPassword = async (req,res,next) =>{
    try {
        const resetToken = crypto.createHash('sha256').update(req.body.token).digest('hex');
    
        const user = await User.findOne({
            passordResetToken:resetToken,
            passwordResetExpires:{$gt:Date.now()}
        });
    
        if(!user){
            return next(new AppError('user not found',404))
        }
    
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.passordResetToken = undefined;
        user.passwordResetExpires = undefined;
        
        await user.save();
    
        createSendToken(user,200,res)
    } catch (error) {
        next(error)
    }
}

exports.updatePassword = async (req,res,next) => {
    try {
        const user = await User.findById((req.user.id||res.locals.user)).select('+password');
        if(!(await user.correctPassword(req.body.currentPassword,user.password))){
            return next(new AppError('user not found',404))
        }
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        await user.save();
    
        res.status(201).json({
            status:'success',
            data:{
                user:user 
            }
        })
    } catch (error) {
        next(error)
    }
}