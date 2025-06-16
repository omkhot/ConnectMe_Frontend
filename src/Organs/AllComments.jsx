import { useContext, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import SettingsTabContext from "../Contexts/SettingsTabContext";
import UserData from "../Contexts/UserData";
import { getAllCommnetsOfOneUser } from "../Axios/UserReq";
import { BsExclamationCircle } from "react-icons/bs";
import changeDateFormat from "../Utils/DateFormater";
import PostDetailsView from "./PostDetailsView";
import PostsPageMobile from "../Pages/PostsPageMobile";

function AllComments(){

    const { user } = useContext(UserData);
    const {setSettingsTab} = useContext(SettingsTabContext);

    const [comments, setComments] = useState([]);

    const [selectedPost, setSelectedPost] = useState(null);

    const getAllCommnets = async() => {
        try {
            const res = await getAllCommnetsOfOneUser(user._id);
            console.log("res from getAllCommnetsOfOneUser: ", res.data);
            setComments(res.data);
        } catch (error) {
            console.log("Error from getAllCommnetsOfOneUser: ", error);
        }
    }

    useEffect(() => {
        getAllCommnets();
    }, [user]);

    return(
        <>
            <div className="px-4 md:mt-10 w-full h-[78vh] overflow-y-scroll">
                <div className="flex items-center gap-2">
                    <BiLeftArrowAlt className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800" onClick={() => setSettingsTab("main")} />
                    <h1 className="text-xl font-bold">Comments</h1>
                </div>

                <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                    {comments?.length === 0 && (
                        <div className="w-full h-full col-span-4 flex flex-col items-center justify-center">
                            <BsExclamationCircle className="text-3xl text-gray-500" />
                            <p className="text-sm text-gray-600 italic">No Comments yet..</p>
                        </div>
                    )}

                    {comments?.map((item) => (
                        <div className="w-full h-full border border-gray-300 rounded-md p-2 mb-5">
                            

                            <div className="flex items-center justify-between">
                                
                                <div className="flex flex-col">
                                    <p>{item.comment}</p>
                                    <span className="text-xs text-gray-400">{changeDateFormat(item.createdAt)}</span>
                                </div>

                                <div className="text-xs text-blue-400 cursor-pointer hover:text-blue-600">
                                    <p onClick={() => setSelectedPost(item.post)}>See more about this post..</p>
                                </div>
                            </div>

                            <div className="w-auto max-h-[350px] mt-2">
                                {item?.post?.postImages && 
                                    <img 
                                        src={item.post.postImages[0]} 
                                        alt="postImage" className="w-full h-auto p-4 max-h-[250px] object-contain border border-gray-300 rounded-md" 
                                    />}
                            </div>
                        </div>
                    ))}
                    
                </div>

                {selectedPost && (
                    <div className="hidden md:block md:w-[50%] absolute top-15 right-0 z-5 overflow-y-auto p-4 bg-white border-l border-gray-200 shadow-md">
                        <PostDetailsView post={selectedPost} onClose={() => setSelectedPost(null)} />
                    </div>
                )}

                {selectedPost && (
                    <div className="md:hidden fixed inset-0 z-50 bg-white min-h-screen overflow-y-auto">
                        <PostsPageMobile
                            post={selectedPost}
                            userId={selectedPost.user?._id}
                            actionType={"commnetedPosts"}
                            onClose={() => setSelectedPost(null)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default AllComments;