import axiosInstance from "./AxiosSetup";

export const GoogleSignIn = async() => {
    // Redirect the browser to start the OAuth flow
    window.location.href = 'https://connectme-backend-bdgi.onrender.com/auth/google';      
}

export const manualLogin = async(data) => {
    try {
        const res = await axiosInstance.post('/auth/manualLogin', data,{
            withCredentials: true
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }        
}

export const manualSignUp = async(data) => {
    try {
        const res = await axiosInstance.post('/auth/manualSignUp', data,{
            withCredentials: true
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }        
}

export const CompleteProfile = async(data) => {
    try {
        const res = await axiosInstance.post('/auth/completeProfile',data,{
            withCredentials: true
        });
        console.log("Response from complete profile: ", res.data);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }        
} 

export const validateAuth = async() => {
    try {
        const res = await axiosInstance.get('/auth/validate',{
            withCredentials: true
        }); 
        return res.data.data;
    } catch (error) {
        console.log("Error from validateAuth: ", error);
        throw error;
    }        
} 

export const logoutReq = async() => {
    try {
        const res = await axiosInstance.get('/auth/logout',{
            withCredentials: true
        }); 
        return res.data;
    } catch (error) {
        console.log("Error from logout: ", error);
        throw error;
    }        
}