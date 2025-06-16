import { useContext, useEffect, useState } from "react";
import { getAllRelatedPosts } from "../Axios/PostsRequests";
import UserData from "../Contexts/UserData";
import PostCards from "../Molecules/PostCards";

function FeedSection() {

    const {user} = useContext(UserData);

    const [posts, setPosts] = useState([]);

    const fetchAllFeeds = async () => {
        const feed = await getAllRelatedPosts(user?._id);
        setPosts(feed);
    }

    useEffect(() => {
        if(user?._id) fetchAllFeeds();
    }, [user]);

    return(
        <>
            <div className="w-full h-full">
               <div className="w-full md:w-3/4 max-w-2xl mx-auto grid grid-cols-1 gap-0 md:gap-6 md:mt-5">
                    {posts.map((post) => (
                        <PostCards key={post._id} post={post} />
                    ))}
               </div>
                
            </div>
        </>
    )
}

export default FeedSection;