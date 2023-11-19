const AppError = require('../util/AppError');

const HandleCastErrorDB = err =>{
    const message = `invalid ${err.path}: ${err.value}`
    new AppError(message,400)
}

const HandleDublicateFieldsDB = err=>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `dublicate key value: ${value}`
    new AppError(message,400)
}

const HandleValidationErrorDB = err=>{
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `invalid input : ${errors.join('. ')}`
    new AppError(message,400)
}

const sendErrDev = (err,req,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack : err.stack
    })
}

const sendErrProd = (err,req,res) =>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }else{
        res.status(err.statusCode).json({
            status:'fail',
            msg:err.message
        })
    }
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        sendErrDev(err,req,res)
    }

    if(process.env.NODE_ENV === 'production'){
        
        let error = {...err}

        if(err.name === 'CastError') error = HandleCastErrorDB(error)
        if(err.code === 11000) error = HandleDublicateFieldsDB(error)
        if(err.name === 'ValidationError') error = HandleValidationErrorDB(error)

        sendErrProd(error,req,res)
    }
    
}