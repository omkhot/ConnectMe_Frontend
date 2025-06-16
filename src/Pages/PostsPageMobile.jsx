import { useContext, useEffect, useState } from "react";
import { getAllLikedPosts, getAllPostsOfUser } from "../Axios/PostsRequests";
import FeedPost from "../Molecules/PostCards";
import UserData from "../Contexts/UserData";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";

function PostsPageMobile({ post, userId, actionType, onClose }) {
    const { user } = useContext(UserData);

    const [myPosts, setMyPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    const fetchUsersPosts = async () => {
        const res = await getAllPostsOfUser(userId);
        // filter post to ensure the selected post come first in list and removed from the res.posts
        const filteredPosts = res.posts.filter((p) => String(p._id) != String(post._id));
        const finalPosts = [post, ...filteredPosts];
        setMyPosts(finalPosts);
    };

    const fetchLikedPosts = async () => {
        const res = await getAllLikedPosts(userId);
        // filter post to ensure the selected post come first in list and removed from the res.posts
        const filteredPosts = res.filter((p) => String(p._id) != String(post._id));
        const finalPosts = [post, ...filteredPosts];
        setLikedPosts(finalPosts);
    };

    useEffect(() => {
        if (actionType === "posts") {
            fetchUsersPosts();
        } else if(actionType !== "postslikes") {
            fetchLikedPosts();
        }
    }, [userId, post]);

    return (
        <div className="h-screen overflow-y-auto py-4 pb-15">
            <div className="text-lg font-semibold text-gray-800 mb-4 flex justify-between items-center px-4">
                {actionType === "posts" && (user._id === userId ? "My Posts" : "Posts")}   
                {actionType === "postslikes" && "Liked Posts"}             
                {actionType === "commnetedPosts" && "Commneted Posts.."}
                {actionType === "liked" && "All Liked Posts"}

                <button>
                    <span
                        className="text-gray-600 hover:text-red-500 cursor-pointer"
                        onClick={onClose}
                    >
                        <BiLeftArrowAlt className="w-6 h-6" />
                    </span>
                </button>
            </div>

            {/* All Posts */}
            <div className="grid grid-cols-1">
                {(actionType === "posts" ? myPosts : likedPosts).map((post) => (
                    <div key={post._id}>
                        <FeedPost post={post} isFromProfile={true}/>
                    </div>
                ))}

                {(actionType === "postslikes" || actionType === "commnetedPosts") && (
                    <div className="">
                        <FeedPost post={post} isFromProfile={true} />
                    </div>
                )}


            </div> 
        </div>
    );
}

export default PostsPageMobile;
