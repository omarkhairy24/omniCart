const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./util/AppError');
const checkoutController = require('./controller/checkoutController');

dotenv.config();


app.post('/webhook',express.raw({type: 'application/json'}),checkoutController.webhookCheckout);
app.use(express.json());
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use("/images",express.static(path.join(__dirname,'public')))

app.use(cors())

app.options('*',cors())

const errorController = require('./controller/errorController');

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const wishlistRoute = require('./routes/wishlistRoute');
const cartRoute = require('./routes/cartRoute');
const checkoutRoute = require('./routes/checkoutRoute');

app.use(compression());

app.use('/api',authRoute);
app.use('/api',userRoute);
app.use('/api',cartRoute);
app.use('/api',productRoute);
app.use('/api',reviewRoute);
app.use('/api',wishlistRoute);
app.use('/api',checkoutRoute);

app.all('*',(req,res,next)=>{
    next(new AppError(`can't find ${req.originalUrl}`,404))
})

app.use(errorController)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected.');
    app.listen(8080)
})