import { useContext, useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import UserData from "../Contexts/UserData";
import { getAllLikedPosts } from "../Axios/PostsRequests";
import { BsExclamationCircle } from "react-icons/bs";
import SettingsTabContext from "../Contexts/SettingsTabContext";
import PostDetailsView from "./PostDetailsView";
import PostsPageMobile from "../Pages/PostsPageMobile";

function LikesPost(){

    const { user } = useContext(UserData);

    const {setSettingsTab} = useContext(SettingsTabContext);

    const [likedPost, setLikedPost] = useState([]);

    const [selectedPost, setSelectedPost] = useState(null);

    const getAllLikedPostsOfUser = async() => {
        try {
            const res = await getAllLikedPosts(user._id);
            console.log("res from getAllLikedPosts: ", res);
            setLikedPost(res);
        } catch (error) {
            console.log("Error from getAllLikedPosts: ", error);
        }
    }

    useEffect(() => {
        getAllLikedPostsOfUser();
    }, [user]);

    return(
        <>
            <div className="px-4 md:mt-10 w-full h-full">
                <div className="flex items-center gap-2">
                    <BiLeftArrowAlt className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800" onClick={() => setSettingsTab("main")} />
                    <h1 className="text-xl font-bold">Likes</h1>
                </div>

                <div className="mt-5 w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {likedPost?.map((post) => (
                        <div className="relative cursor-pointer group" key={post._id} onClick={() => setSelectedPost(post)}>
                            <img
                                src={post.postImages[0]}
                                alt="post"
                                className="w-full h-40 md:h-48 object-contain rounded-md group-hover:opacity-80 transition duration-300"
                                loading="lazy"
                            />
                            {post.postImages.length > 1 && (
                                <span className="absolute bottom-2 right-2 text-[10px] bg-white px-2 py-1 border border-gray-300 rounded-full text-gray-700 shadow-sm">
                                    1/{post.postImages.length}
                                </span>
                            )}
                        </div>
                    ))}
                    {likedPost?.length === 0 && (
                        <div className="w-full h-full col-span-4 flex flex-col items-center justify-center">
                            <BsExclamationCircle className="text-3xl text-gray-500" />
                            <p className="text-sm text-gray-600 italic">No Liked Posts</p>
                        </div>
                    )}
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
                            actionType={"postslikes"}
                            onClose={() => setSelectedPost(null)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default LikesPost;