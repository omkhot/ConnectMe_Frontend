import { useContext, useEffect, useState } from "react";
import UserData from "../Contexts/UserData";
import { fetchAllFollowings, sendFollowRequest, unFollowUserReq } from "../Axios/FollowFollowing";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TopHeader from "../Organs/TopHeader";
import LeftNavBar from "../Organs/LeftNavBar";
import FollowReqSection from "../Organs/FollowReqSection";
import Button from "../Atoms/Buttons";
import { MessageCircleMore } from "lucide-react";


function FollowingPage({}) {

    const {userId} = useParams(); 

    const {user} = useContext(UserData);

    const [followings, setFollowings] = useState([]);

    const navigate = useNavigate();

    const getAllFollowings = async () => {
        try {
            console.log("userId: ", userId);
            const res = await fetchAllFollowings(userId);
            console.log("res from fetchfollowings", res.data);
            const resData = res.data.following;
            setFollowings(resData);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }

    const handelUnfollow = async (followingId) => {

        const confirm = window.confirm("Are you sure you want to unfollow this user?");
        if (!confirm) return;

        try {
            const data = {userId: user._id, unfollowUserId: followingId};
            await unFollowUserReq(data);
            alert("Unfollowed Successfully..!");
        } catch (error) {
            console.error("Error unfollowing user:", error);
            alert("Unfollow Failed Please try again later..!");
        }
    }

    const handelFollow = async (followingId) => {

        const confirm = window.confirm("Are you sure you want to follow this user?");
        if (!confirm) return;

        try {
            const data = {senderId: user._id, receiverId: followingId};
            await sendFollowRequest(data);
            alert("Follow Request Sent Successfully..!");
        } catch (error) {
            console.error("Error unfollowing user:", error);
            alert("Follow Request Failed Please try again later..!");
        }
    }

    const handelMsgClick = () => {
        navigate(`/chats`);
    }

    useEffect(() => {
        getAllFollowings();
    }, [userId]);

    return (
        <>
            <div className={`hidden md:block w-full h-screen `}>

                <div className="w-[100%] border-b border-gray-300 bg-white z-50 fixed top-0 left-0">
                    <TopHeader />
                </div>

                {/* Page Content */}
                <div className="w-[100%] h-[90%] flex flex-1 pt-[70px]">
                    {/* Sidebar */}
                    <div className="w-[25%] z-15 fixed top-[70px] lg:w-[18%]">
                        <LeftNavBar />
                    </div>

                    {/* Main Content */}
                    <div className="w-full mt-15 md:w-[70%] md:ml-[30%] lg:w-[45%] lg:ml-[25%] relative">
                        <div className="w-full flex items-center gap-2 mb-4 bg-white sticky top-2 z-10">
                            <FaArrowLeft onClick={() => window.history.back()} className=" cursor-pointer" />
                            <h1 className="text-md font-semibold">Followings</h1>
                        </div>

                            {/* When we see our own profile page: */}

                        <div className={`w-full h-full ${user?._id === userId ? "block" : "hidden"} overflow-y-auto scrollbar-none`}>
                            {followings.map((follower) => (
                                <div key={follower._id} className="w-full flex items-center gap-2 py-2 px-4 border-b border-gray-100 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                                    <img src={follower.profileImage} alt="avatar" className="w-10 h-10 md:w-16 md:h-16 rounded-full object-contain border border-gray-200" />
                                    <div>
                                        <h1 className="text-xs md:text-md font-semibold text-gray-400">
                                            {follower.firstName} {follower.lastName || ""}
                                        </h1>
                                        <h1 className="text-md text-gray-800">
                                            {follower.socialId || "You"}{" "}
                                        </h1>
                                        <p className="text-sm md:text-md text-gray-600">{follower.bio}</p>
                                    </div>

                                    <div className="flex items-center gap-2 ml-auto">
                                        <Button text="Message" type="listButtons" onClick={() => {handelMsgClick()}} />
                                        <Button text="Unfollow" type="listButtons" onClick={() => {handelUnfollow(follower._id)}} />
                                    </div>
                                </div>
                            ))}
                        </div>  

                            {/* When we see other's profile page: */}
                        <div className={`w-full h-full ${user?._id !== userId ? "block" : "hidden"} overflow-y-auto scrollbar-none`}>
                            {followings.map((follower) => (
                                <div key={follower._id} className="w-full flex items-center gap-2 py-2 px-4 border-b border-gray-100 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                                    <img src={follower.profileImage} alt="avatar" className="w-10 h-10 md:w-16 md:h-16 rounded-full object-contain border border-gray-200" />
                                    <div>
                                        <h1 className="text-xs md:text-md font-semibold text-gray-400">
                                            {follower.firstName} {follower.lastName || ""}
                                        </h1>
                                        <h1 className="text-md text-gray-800">
                                            {follower.socialId || "You"}{" "}
                                        </h1>
                                        <p className="text-sm md:text-md text-gray-600">{follower.bio}</p>
                                    </div>

                                    <div className="flex items-center gap-2 ml-auto">
                                        {user.following.includes(follower._id) ? (
                                            <Button text="Unfollow" type="listButtons" onClick={() => {handelUnfollow(follower._id)}} />
                                        ) : (
                                            <div className={`${user._id === follower._id ? "hidden" : "block"}`}>
                                                <Button text="Follow" type="listButtons" onClick={() => {handelFollow(follower._id)}} />
                                            </div>                                            
                                        )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                                             
                    </div>
                </div>               
                
            </div>

            {/* For mobile screens */}

            <div className={`block md:hidden w-full h-screen px-2 py-4`}>
                <div className="w-full flex items-center gap-4 mb-4 bg-white sticky top-2 z-10">
                    <FaArrowLeft onClick={() => window.history.back()} className="cursor-pointer" />
                    <h1 className="text-md font-semibold">Followings</h1>
                </div>

                <div className="w-full h-full overflow-y-auto scrollbar-none">
                    {followings.map((follower) => (
                        <div key={follower._id} className="w-full flex items-center gap-2 py-2 px-4 border-b border-gray-100 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                            <img src={follower.profileImage} alt="avatar" className="w-10 h-10 md:w-16 md:h-16 rounded-full object-contain border border-gray-200" />
                            <div>
                                <h1 className="text-xs md:text-md font-semibold text-gray-400">
                                    {follower.firstName} {follower.lastName || ""}
                                </h1>
                                <h1 className="text-md text-gray-800">
                                    {follower.socialId || "You"}{" "}
                                </h1>
                                <p className="text-sm md:text-md text-gray-600">{follower.bio}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                                <Button text="" children={<MessageCircleMore />} onClick={() => {handelMsgClick()}} />
                                <Button text="Unfollow" type="listButtons" onClick={() => {handelUnfollow(follower._id)}} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute w-[30%] right-0 top-[70px] mt-15 ">
                <FollowReqSection />
            </div>
        </>
    )
}
 
export default FollowingPage;  