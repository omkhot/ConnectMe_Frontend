import axiosInstance from "./AxiosSetup";

export const fetchAllChats = async function(userId) {
    try {
        const response = await axiosInstance.get(`/chats/getAll/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
}

export const createNewChat = async function(chatDetails) {
    try {
        const response = await axiosInstance.post('/chats/create', chatDetails);
        return response.data;
    } catch (error) {
        console.error('Error creating new chat:', error);
        throw error;
    }
}

export const fetchChatMessages = async function(chatId) {
    try {
        const response = await axiosInstance.get(`/msg/getAll/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }
}

export const sendChatMessage = async function(messageDetails) {
    try {
        const response = await axiosInstance.post(`/msg/send/`, messageDetails);
        return response.data;
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
}