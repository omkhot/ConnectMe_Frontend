import { useContext } from "react";
import { deletePost, updatePost } from "../Axios/PostsRequests";
import UserData from "../Contexts/UserData";

function usePostsMethods(post) {

    const { user } = useContext(UserData);

    const deleteMyPost = async () =>{
        try{
            const res = await deletePost(post._id, user._id);
            alert("Post Deleted Successfully");
        }catch(err){
            console.log(err);
            alert(err.response?.data?.message || "Post Deletion Failed");
        }
    }

    const editMyPost = (updatedCaption) => {
        try {
            const res = updatePost(post._id, updatedCaption);
            console.log("res from updatePost: ", res);
            alert("Post Updated Successfully");
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    return {
        deleteMyPost,
        editMyPost
    }

}

export default usePostsMethods; 