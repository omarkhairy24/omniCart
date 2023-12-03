import axios from "axios";

export const deleteProduct = async(productId)=>{
    try {
        
        const res = await axios({
            method:'DELETE',
            url:'http://localhost:8080/api/delete-product',
            data:{
                productId
            }
        });

        if(res.data.status === 'success'){
            location.assign('/my-products')
        }

    } catch (error) {
        alert(error)
    }
};

export const updateInfo = async(name,email)=>{
    try {
        const res = await axios({
            method:'PATCH',
            url: 'http://localhost:8080/api/update-user',
            data:{
                name,email
            }
        });

        if(res.data.status === 'success'){
            alert(`info updated successfully`)
            location.reload(true);
        }

    } catch (error) {
        alert(error)
    }
}

export const updatePassword = async(currentPassword,password,confirmPassword)=>{
    try {
        const res = await axios({
            method:'PATCH',
            url: 'http://localhost:8080/api/update-password',
            data:{
                currentPassword,password,confirmPassword
            }
        });

        if(res.data.status === 'success'){
            alert(`password updated successfully`)
            location.assign('/');
        }

    } catch (error) {
        alert(error)
    }
}

export const deactivateUser = async ()=>{
    try {
        const res = await axios({
            method:'DELETE',
            url: 'http://localhost:8080/api/delete-me',
        });

        if(res.data.status === 'success'){
            alert(`user deactivated successfully`)
            location.assign('/');
        }

    } catch (error) {
        alert(error)
    }
}

export const getResetPassword = async(email) =>{
    try {
        const res = await axios({
            method:'POST',
            url: 'http://localhost:8080/api/forgetpassword',
            data:{
                email
            }
        });
        if(res.data.status === 'success'){
            alert('token sent to your email')
            location.assign('/reset-password');
        }

    } catch (error) {
        alert(error)
    }
} 

export const resetPassword = async(token,password,confirmPassword) =>{
    try {
        const res = await axios({
            method:'POST',
            url: 'http://localhost:8080/api/resetpassword',
            data:{
                token,password,confirmPassword
            }
        });

        if(res.data.status === 'success'){
            location.assign('/login');
        }

    } catch (error) {
        alert(error)
    }
}

export const signup = async(email,name,password,confirmPassword,role) =>{
    try {
        const res = await axios({
            method:'POST',
            url: 'http://localhost:8080/api/signup',
            data:{
                email,name,password,confirmPassword,role
            }
        });
        if(res.data.status === 'success'){
            alert('account created successfully');
            location.assign('/login');
        }
    } catch (error) {
        alert(error)
    }
}