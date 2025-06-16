// Utils/fetchStories.js
import { GetAllStories } from "../Axios/StoryReq";

const fetchStories = async (user) => {
  try {
        const res = await GetAllStories(user?._id);

        const userStoryIndex = res.findIndex((story) => story.userId === user?._id);
        let updatedStories = [];

        if (userStoryIndex !== -1) {
            const userStory = res[userStoryIndex];
            const otherStories = res.filter((_, index) => index !== userStoryIndex);
            updatedStories = [userStory, ...otherStories];
        } 
        else {
            const currentUserStory = {
                userId: user?._id,
                socialId: "You",
                name: "You",
                profileImage: user?.profileImage,
                isSeen: true,
                placeholder: true,
            };
            updatedStories = [currentUserStory, ...res];
        }

        return updatedStories;
    } catch (error) {
        console.error("Error fetching stories:", error);
        return [];
    }
};

export default fetchStories;
