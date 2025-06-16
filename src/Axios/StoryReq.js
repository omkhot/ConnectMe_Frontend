import axiosInstance from "./AxiosSetup";

export const GetAllStories = async(userId)=>{
    try {
        const res = await axiosInstance.get(`/stories/all/${userId}`); 
        console.log("Response from GetAllStories: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from GetAllStories: ", error);
        throw error;
    }    
}

export const CreateNewStory = async(data) => {
    try {
        const res = await axiosInstance.post('/stories/upload', data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }); 
        console.log("Response from createNewStory: ", res.data.data);
        return res.data.data;
    } catch (error) {
        console.log("Error from createNewStory: ", error);
        throw error;
    }
}