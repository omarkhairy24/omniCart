const Stripe = require('stripe')(process.env.STRIPE_KEY);
const User = require('../model/userModel');
const Order = require('../model/orderModel');
const AppError = require('../util/AppError');

exports.getCheckOutSession = async(req,res,next) =>{
    try {
        const user = await User.findById(req.user.id || res.locals.user).populate('cart.items.product');
        let products = user.cart.items;
        const session = await Stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items : products.map(p =>{
                return {
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:p.product.name,
                            description:p.product.highligth
                        },
                        unit_amount:Math.ceil(p.product.price*100)
                    },
                    quantity:p.quantity
                }
            }),
            mode:'payment',
            customer_email:user.email,
            // client_reference_id:products.map(p=>{
            //     return p.product._id
            // }), 
            success_url: req.protocol + '://' + req.get('host') + '/get-check-out', // => http://localhost:3000
            cancel_url: req.protocol + '://' + req.get('host') + '/categories'
        })

        res.status(200).json({
            status:'success',
            data:{
                session
            }
        })
    } catch (error) {
        next(error)
    }
}

const createCheckoutOrders = async session =>{
    const user = await User.findOne({email:session}).populate('cart.items.product cat.items.owner');
    let products = user.cart.items;
    console.log('products',products);
    let total = 0;
    products.forEach( p=>{
        total += p.quantity * p.product.price
    })
    console.log('total',total);
    const productsInfo = products.map( p =>{
        return {quantity:p.quantity , product:p.product._id,owner:p.owner}
    })
    console.log('prod info', productsInfo);
    await Order.create({
        user:user._id,
        products:productsInfo,
        totalPrice:total
    })
    await user.emptyCart();
}

exports.webhookCheckout = (req,res,next)=>{
    const ws = 'whsec_SsLjXjy9wJNqLlndW9swRWaUFivYoneW'
    const signature = req.headers['stripe-signature'];
    let event;
    try {
        event = Stripe.webhooks.constructEvent(
            req.body,
            signature,
            ws
        )
    } catch (error) {
        res.status(400).send(`webhook error ${ws}`)
    }
    let data;
    if(event.type === 'checkout.session.completed'){
        data = event.data.object.customer_email
        createCheckoutOrders(data)
    }
    res.status(200).send({received:true , data:data})
}