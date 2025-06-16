import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../Axios/UserReq";
import { use, useEffect, useState } from "react";
import TopHeader from "../Organs/TopHeader";
import LeftNavBar from "../Organs/LeftNavBar";
import ProfileHeader from "../Molecules/Profiles/ProfileHeader";
import ProfileActionButtons from "../Molecules/Profiles/ProfileActionButtons";
import PostGallery from "../Molecules/Profiles/PostGallery";
import PostDetailsView from "../Organs/PostDetailsView";
import PostsPageMobile from "./PostsPageMobile";
import { getAllLikedPosts, getAllPostsOfUser } from "../Axios/PostsRequests";

function OthersProfilePage(){

    const {searchedSocialId} = useParams();

    const [ userDetails, setUserDetails ] = useState({});

    const [tab, setTab] = useState("posts");
    const [myPosts, setMyPosts] = useState([]);
    const [likedPosts,setLikedPosts] = useState([]);

    const [selectedPost, setSelectedPost] = useState(null);
    
    const naviagte = useNavigate();

    const fetchUsersPosts = async () => {
        const res = await getAllPostsOfUser(userDetails?._id);
        console.log("res from fetchUsersPosts of others: ", res);
        setMyPosts(res.posts);
    }

    const fetchLikedPosts = async () =>{
        const res = await getAllLikedPosts(userDetails?._id);
        setLikedPosts(res);
    }

    useEffect(() => {
        fetchUsersPosts();
        fetchLikedPosts();
    }, [tab, searchedSocialId]);

    const fetchUserDetails = async () => {
        try {
            const res = await getUserDetails(searchedSocialId);
            console.log("res from fetchUserDetails: ", res.data);
            setUserDetails(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [searchedSocialId]);

    return(
        <>
            <div className="w-full">

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
                            <ProfileHeader isOtherUser={true} otherUserDetails={userDetails} />
                        </div>
                        
                        {/* Mobile View */}
                        <div className="mt-2 flex justify-around items-center gap-4 md:hidden">
                            {
                                ["posts", "followers", "following"].map((key) => (
                                    <div key={key} className="flex flex-col items-center" 
                                        onClick={() =>{
                                            if(key === "followers") naviagte(`/followers/${userDetails?._id}`);
                                            if(key === "following") naviagte(`/following/${userDetails?._id}`);
                                        }}
                                    >
                                        <div className="text-md text-gray-600 font-semibold">
                                            {userDetails?.[key]?.length}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="w-full md:w-2xl flex items-center gap-4 mt-4">
                            <button
                                className="px-4 py-2 w-1/2 border border-gray-300 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
                            >
                                Unfollow
                            </button>
                            <button
                                className="px-4 py-2 w-1/2 border border-gray-300 rounded-md font-semibold ml-2"
                            >
                                Message
                            </button>
                        </div>                        

                        {/* activities */}

                        {tab === "posts" && <PostGallery posts={userDetails?.posts} emptyMessage={userDetails?.socialId + " has not posted any posts yet!"} onPostClick={setSelectedPost} />}
                        
                    </div>

                    {selectedPost && (
                        <div className="hidden md:block md:w-[50%] overflow-y-auto p-4 bg-white border-l border-gray-200 shadow-md">
                            <PostDetailsView post={selectedPost} onClose={() => setSelectedPost(null)} />
                        </div>
                    )}

                    {selectedPost && (
                        <div className="md:hidden fixed inset-0 z-50 bg-white min-h-screen overflow-y-auto">
                            <PostsPageMobile
                                post={selectedPost}
                                userId={userDetails?._id}
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

export default OthersProfilePage;