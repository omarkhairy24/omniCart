import '@babel/polyfill'; //to run into older browsers
import {login,removeFromCart,reduceQuantity,increaseQuantity,removeFromWishlist,addToWishlist,addReview,editReview,deleteReview} from './main';
import { Order } from './checkout';
import{deleteProduct,updateInfo,updatePassword,deactivateUser,getResetPassword,resetPassword,signup} from './admin'

const loginForm = document.querySelector('.form--login');
const cartForm = document.querySelectorAll('#remove');
const rquantity = document.querySelectorAll('#decrease-q');
const iquantity = document.querySelectorAll('#increase-q');
const cartHome = document.querySelectorAll('#btn-cart-bn');
const rwishlist = document.querySelectorAll('#remove-from-wishlist');
const awishlist = document.querySelectorAll('#btn-wish-bn');
const productBtn = document.querySelectorAll('#btn-delete-bn');
const userForm = document.querySelector('#update-info')
const passwordForm = document.querySelector('#update-password');
const activeBtn = document.getElementById('de-activate')
const forgetForm = document.getElementById('forget--password');
const resetForm = document.getElementById('reset-password');
const signupForm = document.getElementById('signup-form');
const reviewForm = document.getElementById('rating-form');
const editForm = document.getElementById('edit-rating-form');
const deleteBtn = document.getElementById('delete-review-button');
const orderBtn = document.getElementById('order-button');

if(loginForm)
    loginForm.addEventListener('submit',e=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email,password)
    });
    
if(cartForm) cartForm.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        const prodId = document.getElementsByName('productId')[i].value;
        removeFromCart(prodId)
    })
});

if(rquantity) rquantity.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        e.preventDefault();
        const prodId = document.getElementsByClassName('prod-decrease')[i].value;
        // console.log(prodId);
        reduceQuantity(prodId)
    })
});

if(iquantity) iquantity.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        e.preventDefault();
        const prodId = document.getElementsByClassName('prod-increase')[i].value;
        // console.log(prodId);
        increaseQuantity(prodId)
    })
});

if(cartHome) cartHome.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        e.preventDefault();
        const prodId = document.getElementsByClassName('product-cart')[i].value;
        // console.log(prodId);
        increaseQuantity(prodId)
    })
})

if(rwishlist) rwishlist.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        e.preventDefault();
        const prodId = document.getElementsByClassName('wish-list')[i].value;
        // console.log(prodId);
        removeFromWishlist(prodId)
    })
})
if(awishlist) awishlist.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        e.preventDefault();
        const prodId = document.getElementsByClassName('product-wish')[i].value;
        // console.log(prodId);
        addToWishlist(prodId)
    })
})

if(productBtn) productBtn.forEach((v,i)=>{
    v.addEventListener('click',e=>{
        e.preventDefault();
        const prodId = document.getElementsByClassName('product-delete')[i].value;
        // console.log(prodId);
        deleteProduct(prodId);
    })
})

if(userForm) userForm.addEventListener('submit',e=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    // console.log(name,email);
    updateInfo(name,email)
})

if(passwordForm) passwordForm.addEventListener('submit',e=>{
    e.preventDefault()
    const currentPassword = document.getElementById('currentPassword').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    updatePassword(currentPassword,password,confirmPassword);
})

if(activeBtn) activeBtn.addEventListener('click',deactivateUser);

if(forgetForm) forgetForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    getResetPassword(email)
})

if(resetForm) resetForm.addEventListener('submit',e=>{
    e.preventDefault();
    const token = document.getElementById('token').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    resetPassword(token,password,confirmPassword);
})

if(signupForm) signupForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    signup(email,name,password,confirmPassword,role);
})

if(reviewForm) reviewForm.addEventListener('submit',e=>{
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const product = document.getElementById('productId').value;
    addReview(rating,review,product)
})

if(editForm) editForm.addEventListener('submit',e=>{
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const reviewId = document.getElementById('reviewId').value;
    // console.log(rating,review,reviewId);
    editReview(rating,review,reviewId)
})

if(deleteBtn) deleteBtn.addEventListener('click',e=>{
    e.preventDefault();
    const reviewId = document.getElementById('reviewId').value;
    deleteReview(reviewId)
})

if(orderBtn) orderBtn.addEventListener('click',e=>{
    e.target.textContent = 'Processing...'
})
if(orderBtn) orderBtn.addEventListener('click', Order)