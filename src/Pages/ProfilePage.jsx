import { useContext, useEffect, useState } from "react";
import UserData from "../Contexts/UserData";
import LeftNavBar from "../Organs/LeftNavBar";
import TopHeader from "../Organs/TopHeader";
import { getAllLikedPosts, getAllPostsOfUser } from "../Axios/PostsRequests";
import ProfileHeader from "../Molecules/Profiles/ProfileHeader";
import ProfileActionButtons from "../Molecules/Profiles/ProfileActionButtons";
import PostGallery from "../Molecules/Profiles/PostGallery";
import PostDetailsView from "../Organs/PostDetailsView";
import PostsPageMobile from "./PostsPageMobile";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";

function ProfilePage(){

    const {user} = useContext(UserData);
    const [tab, setTab] = useState("posts");
    const [myPosts, setMyPosts] = useState([]);
    const [likedPosts,setLikedPosts] = useState([]);

    const [selectedPost, setSelectedPost] = useState(null);
    
    const naviagte = useNavigate();

    const fetchUsersPosts = async () => {
        const res = await getAllPostsOfUser(user?._id);
        setMyPosts(res.posts);
    }

    const fetchLikedPosts = async () =>{
        const res = await getAllLikedPosts(user?._id);
        setLikedPosts(res);
    }

    useEffect(() => {
        fetchUsersPosts();
        fetchLikedPosts();
    }, [tab, user]);

    return(
        <>
            <div className="w-full">

                <div className="md:hidden absolute top-25 right-4">
                    <Settings className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-800" onClick={() => naviagte("/settings")} />
                </div>

                <div className={`${selectedPost ? "hidden md:block" : "block"} w-full z-500 w-full border-b border-gray-300 bg-white z-50 fixed top-0 left-0`}>
                    <TopHeader />                    
                </div>

                <div className="w-full flex mt-[80px]">

                    <div className={`md:${selectedPost ? "hidden" : "block"} md:w-[20%] md:fixed md:left-0 md:top-[80px] lg:w-[15%] xl:w-[12%] h-screen bg-white border-r border-gray-200 shadow-md overflow-y-auto`}>
                        <LeftNavBar />
                    </div>


                    <div className={`transition-all duration-300 ${selectedPost ? 'hidden md:block md:w-[45%] lg:w-[50%] xl:w-[60%]' : 'w-full md:w-[70%]'} px-4 md:py-10 md:mx-auto lg:mx-auto`}>
                        
                        {/* Image and Name section */}
                        <div className="w-[95%]">
                            <ProfileHeader />                            
                        </div>
                        
                        {/* Mobile View */}
                        <div className="mt-2 flex justify-around items-center gap-4 md:hidden">
                            {
                                ["posts", "followers", "following"].map((key) => (
                                    <div key={key} className="flex flex-col items-center" 
                                        onClick={() =>{
                                            if(key === "followers") naviagte(`/followers/${user?._id}`);
                                            if(key === "following") naviagte(`/following/${user?._id}`);
                                        }}
                                    >
                                        <div className="text-md text-gray-600 font-semibold">
                                            {user?.[key]?.length}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Buttons section */}
                        <ProfileActionButtons/>

                        {/* Activities section */}
                        <div className="mt-4 w-full flex justify-around items-center gap-2 py-2 border-b border-gray-200">
                            <div className={`text-sm text-gray-600 font-semibold cursor-pointer hover:text-gray-800 ${tab == "posts" ? "bg-[#f5f5f5] px-4 py-2 rounded-full" : ""}`} onClick={() => setTab("posts")}>My Posts</div>
                            <div className={`text-sm text-gray-600 font-semibold cursor-pointer hover:text-gray-800 ${tab != "posts" ? "bg-[#f5f5f5] px-4 py-2 rounded-full" : ""}`} onClick={() => setTab("liked")}>Liked Posts</div>
                        </div>

                        {/* Related activities */}

                        {tab === "posts" && <PostGallery posts={myPosts} emptyMessage="You have not posted anything yet!" onPostClick={setSelectedPost} />}
                        {tab === "liked" && <PostGallery posts={likedPosts} emptyMessage="You have not Liked any Posts yet!" onPostClick={setSelectedPost} />}

                    </div>

                    {selectedPost && (
                        <div className="hidden md:block md:w-[50%] overflow-y-auto p-4 bg-white border-l border-gray-200 shadow-md">
                            <PostDetailsView post={selectedPost} onClose={() => setSelectedPost(null)} fromProfile = {true} />
                        </div>
                    )}

                    {selectedPost && (
                        <div className="md:hidden fixed inset-0 z-50 bg-white min-h-screen overflow-y-auto">
                            <PostsPageMobile
                                post={selectedPost}
                                userId={user?._id}
                                actionType={tab}
                                onClose={() => setSelectedPost(null)}
                            />
                        </div>
                    )}

                    
                </div>                              
                
            </div>

            
        </>
    )
}

export default ProfilePage;