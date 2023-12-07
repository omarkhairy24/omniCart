const Product = require('../model/productModel');
const WishList = require('../model/wishlistModel');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../util/AppError');
const catchAsync = require('../util/catchAsync');
const User = require('../model/userModel');

const multerStroage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('no images provided'),false)
    }
}

const upload = multer({
    storage:multerStroage,
    fileFilter:multerFilter
})

exports.uploadImage = upload.fields([{
    name:'images',maxCount:10
}]);

exports.resizeImage = async(req,res,next)=>{
    try {
        if(!req.files.images){
            return next();
        };
    
        req.body.images = [];
    
        await Promise.all(
            req.files.images.map(async(file,i)=>{
                const fileName = `product-${req.params.id}-${Date.now()}-${i+1}.jpeg`;
                await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({quality:100})
                .toFile(`public/images/${fileName}`)
    
                req.body.images.push(fileName)
    
            })  
        )
        next();
    } catch (error) {
        next(error)
    }
}


let item_per_page = 10


exports.getAllProducts = catchAsync(async (req,res,next) =>{
    const page = req.query.page*1 || 1
    const productLength = await Product.countDocuments();
    const products = await Product.aggregate([
        {
            $sample:{size:productLength}
        }
    ]).skip((page-1)*item_per_page).limit(item_per_page);
    res.status(200).json({
        status:'success',
        data:{
            products
        }
    })
})

exports.getProduct = async (req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        const recommended = await Product.find({$and:[{category:product.category},{name:{$ne:product.name}}]});
        if(req.user){
            const wishList = await WishList.findOne({product:product,user:req.user.id});
            const user = await User.findById(req.user.id);
            user.cart.items.some( p =>{
                if (p.product._id.equals(req.params.id)){
                    product.inCart = true
                }else{
                    product.inCart = false
                }
            });
            if(wishList){
                product.isFav = true
            }else{
                product.isFav = false
            };
        }
        res.status(200).json({
            status:'success',
            product,
            recommended
        })
    } catch (error) {
        next(error)
    }
}

exports.getSalesProd = catchAsync(async (req,res,next) =>{
    const product = await Product.find({discount:{$ne:undefined}}).sort({'updatedAt':-1});
    res.status(200).json({
        status:'success',
        data:{
            product
        }
    })
})

exports.createProduct = async(req,res,next)=>{
    try {
        
        const product = await Product.create({
            name:req.body.name,
            brand:(req.user.id || res.locals.user),
            highligth:req.body.highligth,
            overview:req.body.overview,
            price:req.body.price,
            category:req.body.category,
            images:req.body.images
        })

        res.status(200).json({
            status:'success',
            data:{
                product
            }
        })

    } catch (error) {
        next(error)
    }
};

exports.updateProduct = async(req,res,next)=> {
    try {
        const prodId = req.params.id
        let product = await Product.findById(prodId);

        if(product.brand._id.toString() !== req.user.id){
            return next(new AppError('not authorized',403))
        }

        product = await Product.findByIdAndUpdate(prodId,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json({
            status:'success',
            product
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteProduct = async(req,res,next) =>{
    try {
        const prodId = req.body.productId
        let product = await Product.findById(prodId);
        if(product.brand._id.toString() !== req.user.id){
            return next(new AppError('not authorized',403))
        }

        product = await Product.findByIdAndDelete(prodId);
        res.status(200).json({
            status:'success',
            message:'product deleted successfully'
        })

    } catch (error) {
        next(error)
    }
}

exports.getCategories =  catchAsync( async (req,res,next)=>{
    const categories = Product.schema.path('category').enumValues;
    res.status(200).json({
        status:'success',
        data:{
            categories
        }
    })
});


exports.getCategory = catchAsync(async(req,res)=>{
    const productLength = (await Product.find({category:req.params.category})).length;
    const products = await Product.aggregate([
        {
            $match:{category:req.params.category}
        },
        {
            $sample:{size:productLength}
        }
    ]);
    res.status(200).json({
        status:'success',
        data:{
            products
        }
    })
})


exports.getSearch = catchAsync(async(req,res,next) =>{
    const search = req.query.search;
    let ratingAverage = req.query.ratingAverage
    let price = req.query.price
    const queryObj = { price,ratingAverage };

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|eq|lte|lt)\b/g, match => `$${match}`);
    console.log(queryStr);

    let products = await Product.find({$and:[
        {$or:[
        {name: { $regex: search, $options: "i"}},
        {name: { $regex: search, $options: "xi"}},
        {name: { $regex: search, $options: "x"}},
        {category:{ $regex: search, $options: "i"}},
        {category:{ $regex: search, $options: "xi"}},
        {category:{ $regex: search, $options: "x"}},
        {overview: { $regex: search, $options: "x"}},
        {overview: { $regex: search, $options: "xi"}},
        {overview: { $regex: search, $options: "i"}}
    ]},JSON.parse(queryStr)]})
       
    res.status(200).json({
        status:'success',
        data:{
            products:products,
            productsLength:products.length
        }
    })
})


exports.addDiscount = async (req,res,next)=>{
    try {
        
        const discount = req.body.discount;
        let afterDiscount = 0;
        const product = await Product.findById(req.params.id);
        if(product.brand._id.toString() !== req.user.id){
            return next(new AppError('not authorized',403))
        }

        const price = product.price;

        afterDiscount = price - (price*discount/100);


        product.discount = afterDiscount;
        product.disPercentage = req.body.discount;
        product.updateDisTime = Date.now()
        await product.save();
        res.status(200).json({
            status:'success',
            data:{
                product
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.removeDiscount = async (req,res) =>{
    try {
        
        const product = await Product.findById(req.params.id);
        if(product.brand._id.toString() !== req.user.id){
            return next(new AppError('not authorized',403))
        }
        product.discount = undefined;
        product.disPercentage = undefined;
        product.updateDisTime = undefined;
        await product.save();
        res.status(200).json({
            status:'success',
            data:{
                product
            }
        })

    } catch (error) {
        next(error)
    }
}

exports.getTopSales = catchAsync(async (req,res,next) =>{
    const products = await Product.find({discount:{$ne:undefined}}).sort({'disPercentage':-1}) 
    res.status(200).json({
        products
    })
})


exports.getHome = catchAsync(async (req,res,next)=>{
    const topSales = await Product.find({discount:{$ne:undefined}}).sort({'disPercentage':-1}).populate('brand','name');
    const categories = Product.schema.path('category').enumValues;
    const sales = await Product.find({discount:{$ne:undefined}}).sort({'updateDisTime':-1});
    const products = await Product.aggregate([
        {
            $sample:{size:await Product.countDocuments()}
        }
    ]).limit(10)
    res.status(200).json({
        topSales:topSales,
        sales:sales,
        categories:categories,
        products:products
    })
})