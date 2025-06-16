import axiosInstance from "./AxiosSetup";

export const getComments = async (postId) => {
  try {
    const response = await axiosInstance.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export const sendComment = async (comment) => {
  try {
    const response = await axiosInstance.post(`/comments/create`, comment);
    return response.data;
  } catch (error) {
    console.error("Error sending comment:", error);
    throw error;
  }
}

