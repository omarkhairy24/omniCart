import axios from "axios";
var stripe = Stripe('pk_test_51Ndu2dFAivaG0tEbtFs71hgCXj6SZGVLntuYKWYrtZLCDipciwvTc3rQWz5ftH77MDwGoU5bDOq3IojgWRh9BvVb00E8DGww5D');
export const Order = async ()=>{
    try{
        const session = await axios('/api/add-check-out');
        await stripe.redirectToCheckout({
            sessionId:session.data.data.session.id
        })
    }catch(error){
        console.log(error);
        alert(error)
    }
}