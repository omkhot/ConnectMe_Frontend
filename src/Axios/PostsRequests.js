import axiosInstance from "./AxiosSetup";

export const getAllRelatedPosts = async(userId) => {
    try {
        const res = await axiosInstance.get(`/posts/all/related/${userId}`); 
        console.log("Response from getAllRelatedPosts: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from getAllRelatedPosts: ", error);
        throw error;
    }
}


export const likeUnlikePost = async(postId, userId) => {
    try {
        const res = await axiosInstance.put(`/posts/likes_unlikes/${postId}`, {userId}); 
        console.log("Response from likeUnlikePost: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from likwUnlikePost: ", error);
        throw error;
    }
}

export const getAllPostsOfUser = async(userId) => {
    try {
        const res = await axiosInstance.get(`/posts/all/${userId}`); 
        console.log("Response from getAllPostsOfUser: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from getAllPostsOfUser: ", error);
        throw error;
    }
}

export const getAllLikedPosts = async(userId) =>{
    try {
        const res = await axiosInstance.get(`/posts/all/liked/${userId}`);
        console.log("Result from liked posts fetching:", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from liked posts fetching: ", error);
        throw error;
    }
}

export const createNewPost = async(data) => {
    try {
        const res = await axiosInstance.post('/posts/create', data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }); 
        console.log("Response from createNewPost: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from createNewPost: ", error);
        throw error;
    }
}

export const bookMarkedPost = async(data) => {
    try {
        const res = await axiosInstance.put(`/posts/bookmark`, data); 
        console.log("Response from bookMarkedPost: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from bookMarkedPost: ", error);
        throw error;
    }
}


export const fetchAllSavedPosts = async(userId) => {
    try {
        const res = await axiosInstance.get(`/posts/bookMarked/${userId}`); 
        console.log("Response from fetchAllSavedPosts: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from fetchAllSavedPosts: ", error);
        throw error;
    }
}

export const deletePost = async(postId, userId) => {
    try {
        const res = await axiosInstance.delete(`/posts/${postId}`,{
            data: {userId}
        }); 
        console.log("Response from deletePost: ", res.data);
        return res.data;
    } catch (error) {
        console.log("Error from deletePost: ", error);
        throw error;
    }
}

export const updatePost = async(postId, data) => {
    try {
        const res = await axiosInstance.put(`/posts/details/${postId}`, data); 
        console.log("Response from updatePost: ", res.data);
        return res.data;
    } catch (error) {
        console.log("Error from updatePost: ", error);
        throw error;
    }
}