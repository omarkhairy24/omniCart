import axios from 'axios';

export const login = async (email,password)=>{
    try {
        
        const res = await axios({
            method:'POST',
            url:'http://localhost:8080/api/login',
            data:{
                email,password
            }
        });

        if(res.data.status ==='success'){
            alert('logged in successfully');
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }

    } catch (error) {
        alert(error)
    }
}

export const removeFromCart = async (productId) =>{
    try {
        
        const res = await axios({
            method:'DELETE',
            url:'http://localhost:8080/api/remove-from-cart',
            data:{
                productId
            }
        });

        if((res.data.status ==='success')) location.reload(true);
        

    } catch (error) {
        alert(error)
    } 
}

export const reduceQuantity = async(productId)=>{
    try {
        
        const res = await axios({
            method:'PUT',
            url:'http://localhost:8080/api/control-quantity',
            data:{
                productId
            }
        });

        if((res.data.status ==='success')) location.reload(true);
        

    } catch (error) {
        alert(error)
    } 
}
export const increaseQuantity = async(productId)=>{
    try {
        
        const res = await axios({
            method:'PUT',
            url:'http://localhost:8080/api/increase-quantity',
            data:{
                productId
            }
        });

        if((res.data.status ==='success')) location.reload(true);
        

    } catch (error) {
        alert(error)
    } 
}

// export const addToCart = async(productId)=>{
//     try {
        
//         const res = await axios({
//             method:'PUT',
//             url:'/api/add-to-cart/',
//             data:{
//                 productId
//             }
//         });

//         if((res.data.status ==='success')) location.reload(false);
        

//     } catch (error) {
//         alert(error)
//     } 
// }

export const addToWishlist = async(productId) =>{
    try {
        
        const res = await axios({
            method:'POST',
            url:'http://localhost:8080/api/add-to-wishlist',
            data:{
                productId
            }
        });

        if((res.data.status ==='success')) location.reload(true);
        

    } catch (error) {
        alert(error)
    }
}

export const removeFromWishlist = async (productId) =>{
    try {
        const res = await axios({
            method:'DELETE',
            url:'http://localhost:8080/api/remove-from-list',
            data:{
                productId
            }
        });

        if((res.data.status ==='success')) location.reload(true);
        

    } catch (error) {
        alert(error)
    } 
}

export const addReview = async(rating,review,product)=>{
    try {
        const res = await axios({
            method:'POST',
            url:'http://localhost:8080/api/add-review',
            data:{
                rating,review,product
            }
        });

        if((res.data.status ==='success') ){
            alert('review added successfully')
        };
    } catch (error) {
        alert(error)
    }
}

export const editReview = async(rating,review,reviewId) =>{
    try{
        const res = await axios({
            method:'PATCH',
            url:'http://localhost:8080/api/:productId/reviews/',
            data:{
                rating,review,reviewId
            }
        })
        if((res.data.status ==='success') ){
            alert('review edited successfully')
        };
    }catch(error){
        alert(error)
    }
}

export const deleteReview = async(reviewId)=> {
    try{
        const res = await axios({
            method:'DELETE',
            url:'http://localhost:8080/api/:productId/reviews/',
            data:{
                reviewId
            }
        })
        if((res.data.status ==='success') ){
            alert('review deleted successfully')
            location.reload(true)
        };
    }catch(error){
        alert(error)
    }
}