import axiosInstance from "./AxiosSetup";

export const GetUser = async() => {
    try {
        const res = await axiosInstance.get('/auth/user',{
            withCredentials: true
        });
        console.log("Logged in user: ", res.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from GetUser: ", error);
        throw error;
    }        
}

export const EditProfileReq = async(data,socialId) => {
    try {
        const res = await axiosInstance.put(`/users/details/${socialId}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }); 
        console.log("Response from EditProfile: ", res.data);
        return res.data;
    } catch (error) {
        console.log("Error from EditProfile: ", error);
        alert(error.response.data);
        throw error;
    }
}

export const searchUserReq = async(data) => {
    try {
        const res = await axiosInstance.get(`/search/user`,{
            params: { query: data },
        }); 
        return res.data;
    } catch (error) {
        console.log("Error from searchUser: ", error);
        throw error;
    }
}

export const getUserDetails = async(socialId) => {
    try {
        const res = await axiosInstance.get(`/users/details/${socialId}`); 
        return res.data;
    } catch (error) {
        console.log("Error from getUserDetails: ", error);
        throw error;
    }
}

export const deleteUser = async(userId) =>{
    try {
        const res = await axiosInstance.delete(`/users/delete/${userId}`); 
        return res.data;
    } catch (error) {
        console.log("Error from getUserDetails: ", error);
        throw error;
    }
}

export const getAllCommnetsOfOneUser = async(userId) => {
  try {
    const response = await axiosInstance.get(`/comments/user/all/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}