import { useContext, useEffect, useState } from "react";
import LeftNavBar from "../Organs/LeftNavBar";
import TopHeader from "../Organs/TopHeader";
import { bookMarkedPost, fetchAllSavedPosts } from "../Axios/PostsRequests";
import UserData from "../Contexts/UserData";

function SavedPostPage(){

    const {user} = useContext(UserData);
    const [savedItems, setSavedItems] = useState([]);

    const fetchSavedPosts = async () => {
        try {
            const response = await fetchAllSavedPosts(user?._id);
            console.log('Response from fetchSavedPosts:', response);
            setSavedItems(response);
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        }
    };

    useEffect(() => {
        fetchSavedPosts();
    }, [user]);


    return(
        <>
            <div className="w-[100%] min-h-screen flex flex-col">

                {/* Top Header */}

                <div className="w-[100%] border-b border-gray-300 bg-white z-50 fixed top-0 left-0">
                    <TopHeader />
                </div>

                {/* Page Content */}

                <div className="w-[100%] flex flex-1 pt-[70px]">

                    {/* Sidebar */}

                    <div className="w-[25%] z-15 fixed top-[70px] lg:w-[18%]">
                        <LeftNavBar />
                    </div>

                    {/* Main Content */}

                    <div className="w-full md:w-[70%] md:ml-[25%] lg:w-[75%] lg:ml-[20%]">
                        
                        <div className="md:mt-10">
                            <h1 className="px-4 text-xl font-bold text-gray-600">Saved Posts</h1>
                        </div>

                        <div className="px-4 mt-5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {savedItems?.map((post) => (
                                <div key={post._id} className="relative cursor-pointer group">
                                    <img
                                        src={post.postImages[0]}
                                        alt="post"
                                        className="w-full h-40 md:h-48 object-cover rounded-md group-hover:opacity-80 transition duration-300"
                                        loading="lazy"
                                    />
                                    {post.postImages.length > 1 && (
                                        <span className="absolute bottom-2 right-2 text-[10px] bg-white px-2 py-1 border border-gray-300 rounded-full text-gray-700 shadow-sm">
                                            1/{post.postImages.length}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
      </div>
        </>
    )
}

export default SavedPostPage;