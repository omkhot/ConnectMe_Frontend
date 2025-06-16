import { useContext, useEffect, useState } from "react";
import UserData from "../Contexts/UserData";
import { fetchAllSuggestedUsers, sendFollowRequest } from "../Axios/FollowFollowing";
import TopHeader from "../Organs/TopHeader";
import LeftNavBar from "../Organs/LeftNavBar";
import SearchBar from "../Molecules/SearchBar";
import ProfileImage from "../Atoms/ProfileImage";


function ExplorePage() {

    const {user} = useContext(UserData);

    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const getSuggestedUsers = async () => {
        try {
            const res = await fetchAllSuggestedUsers(user._id);
            console.log("res from fetchAllSuggestedUsers", res.data);            
            setSuggestedUsers(res.data);
        } catch (error) {
            console.error("Error fetching suggested users:", error);            
        }
    }

    const handleFollow = async (userId) => {
        const details = {
            senderId : user._id,
            receiverId : userId
        }
        try {
            const res = await sendFollowRequest(details);
            console.log("res from fetchFollowUser", res.data);
            alert(res.data.message);
            getSuggestedUsers();
        } catch (error) {
            console.error("Error following user:", error);            
        }
    }

    useEffect(() => {
        if(user){
            getSuggestedUsers();
        }
    }, [user]);

    return(
        <>
            <div className="w-[100%] min-h-screen flex flex-col">
                {/* Top Header */}
                <div className="w-[100%] border-b border-gray-300 bg-white z-50 fixed top-0 left-0">
                    <TopHeader />
                </div>

                {/* For mobile screens only we have to show the search bar */}
                <div className={`w-full md:hidden mt-20 px-2`}>
                    <SearchBar />
                </div>

                {/* Page Content */}
                <div className="w-[100%] flex flex-1 pt-2 md:pt-[70px]">
                    {/* Sidebar */}
                    <div className="w-[25%] z-15 fixed top-[70px] lg:w-[18%]">
                        <LeftNavBar />
                    </div>              

                    {/* Main Content */}
                    <div className="w-full mt-2 px-2 md:mt-10 md:w-[70%] md:ml-[30%] lg:w-[75%] lg:ml-[20%]">
                        <div className="mb-5">
                            <h1 className="text-md text-gray-700 font-bold">You might like to Follow ...</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {suggestedUsers?.map((item) => (
                                <div key={item._id} className="w-full flex md:flex-col items-center p-2 hover:bg-gray-50 transition duration-200 hover:scale-105 hover:shadow-md border border-gray-300 rounded-lg cursor-pointer">
                                    <div>
                                        <ProfileImage url={item.profileImage} styling="w-20 h-20 lg:w-25 lg:h-25 bg-gray-200 rounded-full object-cover mr-3" />
                                    </div>
                                    <div className="w-full flex flex-col items-center">
                                        <span className="text-gray-700 font-semibold text-md">{item.socialId}</span>
                                        <span className="font-semibold text-gray-500 text-xs">{item.firstName} {item.lastName}</span>                                        
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <button 
                                            onClick={() => handleFollow(item._id)}
                                            className={`${user.sentFollowRequests.includes(item._id) ? "bg-white text-gray-500 border border-gray-300" : "text-white bg-blue-500 hover:bg-blue-600 "} w-[80%] text-center px-4 py-2 rounded-md mt-2 cursor-pointer`}
                                        >
                                            {user.sentFollowRequests.includes(item._id) ? "Requested" : "Follow"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div> 
                </div>
            </div>
        </>
    )
}

export default ExplorePage;