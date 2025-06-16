import { useContext, useEffect, useState } from "react";
import { getComments, sendComment } from "../Axios/CommnetsReq";
import CommentDialougue from "../Atoms/CommnetDialogue";
import { SendHorizonal } from "lucide-react";
import UserData from "../Contexts/UserData";

function CommentsBox({postId, setShowComments, setNoOfCommnets}){

    const {user} = useContext(UserData);
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState("");

    const handleSend = async () => {
        if(newComment.trim() === "") return;
        // Send the new comment to the server
        const commentData = {
            post: postId,
            comment: newComment,
            user: user._id,
        }
        const response = await sendComment(commentData);
        console.log("response from sendComment", response); 
        setNewComment(""); // Clear the input field
        setNoOfCommnets(response.data.updatedPost.comments.length); // Update the number of comments
        fetchAllCommnets(); // Fetch all comments again to update the list
    }

    const fetchAllCommnets = async () => {
        const commentsData = await getComments(postId);
        console.log("commentsData.data", commentsData.data);
        setComments(commentsData.data);        
    }

    useEffect(() => {
        fetchAllCommnets();
    }, [postId]);

    return(
        <>
            <div className="hidden md:flex flex-col gap-2 p-4 bg-white shadow-md ">
                
                {/* Sending new Comment */}
                <div className="flex items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="w-full p-2 border border-gray-300 rounded-md" 
                    />
                    <button 
                        onClick={handleSend}
                        disabled={newComment.trim() === ""}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >   
                        <SendHorizonal size={24} />
                    </button>
                </div>

                {/* Comments List */}
                <div>
                    {comments?.length == 0 && (
                        <p className="text-sm text-gray-500">No comments yet !</p>
                    )}

                    {comments?.length > 0 && comments.map((comment) => (
                            <CommentDialougue key={comment._id} commentDetails={comment} /> 
                        ))
                    }
                </div>

            </div>

            {/* For Mobile */}
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end md:hidden" onClick={() => setShowComments(false)}>
                <div className="w-full max-w-md bg-white p-4 rounded-t-lg shadow-lg " onClick={(e) => e.stopPropagation()}>

                    <div className="flex flex-col gap-2 min-h-[70vh] overflow-y-auto">
                        {comments?.length == 0 && (
                            <p className="text-sm text-gray-500">No comments yet !</p>
                        )}

                        {comments?.length > 0 && comments.map((comment) => (
                            <CommentDialougue key={comment._id} commentDetails={comment} />
                        ))}
                    </div>
                    
                    {/* Sending new Comment */}
                    <div className="absolute bottom-0 left-0 w-full bg-white p-3 flex items-center">
                        <input
                            type="text"
                            className="flex-grow border border-gray-200 rounded-l-xl px-4 py-2 text-sm"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-500 border border-blue-500 text-white p-2 rounded-r-xl hover:bg-blue-600"
                        >
                            <SendHorizonal size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentsBox;