// hooks/useFeedPostActions.js
import { useState } from "react";
import { bookMarkedPost, likeUnlikePost } from "../Axios/PostsRequests";

export default function useFeedPostActions(post, userId) {
    
    const [liking, setLiking] = useState(post.likes.includes(userId));
    const [likes, setLikes] = useState(post.likes.length);
    const [bookmarked, setBookmarked] = useState(post.bookMarkedBy.includes(userId));
    const [showComments, setShowComments] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post.comments.length);

    const toggleLike = async () => {
        const res = await likeUnlikePost(post._id, userId);
        setLikes(res.likes.length);
        setLiking(!liking);
    };

    const toggleBookmark = async () => {
        try {
            await bookMarkedPost({ postId: post._id, userId });
            setBookmarked(!bookmarked);
        } catch (err) {
            alert(err.response?.data?.message || "Bookmark failed");
        }
    };
 
    return {
        liking,
        likes,
        bookmarked,
        showComments,
        commentsCount,
        toggleLike,
        toggleBookmark,
        setShowComments,
        setCommentsCount,
    };
}
