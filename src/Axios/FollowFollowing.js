import axiosInstance from "./AxiosSetup";

export const fetchAllFollowers = async function(userId) {
    try {
        const response = await axiosInstance.get(`/followRequests/all/followers/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching followers:', error);
        throw error;
    }
} 

export const fetchAllFollowings = async function(userId) {
    try {
        const response = await axiosInstance.get(`/followRequests/all/following/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching followings:', error);
        throw error;
    }
}

export const fetchAllRequests = async function(userId) {
    try {
        const response = await axiosInstance.get(`/followRequests/all/requests/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error;
    }
}

export const fetchAllSentRequests = async function(userId) {
    try {
        const response = await axiosInstance.get(`/followRequests/all/sentRequests/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sent requests:', error);
        throw error;
    }
}

export const fetchAllSuggestedUsers = async function(userId) {
    try {
        const response = await axiosInstance.get(`/followRequests/suggest/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suggested users:', error);
        throw error;
    }
}

export const sendFollowRequest = async function(data) {
    try {
        const response = await axiosInstance.post(`/followRequests/send`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending follow request:', error);
        throw error;
    }
}

export const acceptFollowRequest = async function(data) {
    try {
        const response = await axiosInstance.put(`/followRequests/accept`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending follow request:', error);
        throw error;
    }
}

export const deleteFollowRequest = async function(data) {
    try {
        const response = await axiosInstance.delete(`/followRequests/delete`, {
            data
        });
        return response.data;
    } catch (error) {
        console.error('Error sending follow request:', error);
        throw error;
    }
}

export const unFollowUserReq = async function(data) {
    try {
        const response = await axiosInstance.post(`/followRequests/unFollow`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending follow request:', error);
        throw error;
    }
}