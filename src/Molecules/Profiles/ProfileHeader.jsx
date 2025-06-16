import { useContext } from "react";
import UserData from "../../Contexts/UserData";
import { useNavigate } from "react-router-dom";

function ProfileHeader({selectedPost, isOtherUser, otherUserDetails}){

    const {user} = useContext(UserData);

    const naviagte = useNavigate();

    return(
        <div className="w-[100%] mx-auto flex items-center gap-4 py-2 border-b border-gray-300 overflow-hidden">
            <img 
                src={isOtherUser ? otherUserDetails?.profileImage : user?.profileImage} 
                alt="avatar" 
                className="w-16 h-16 md:w-25 md:h-25 rounded-full object-contain border border-gray-200"
            />
            {isOtherUser ? 
                (<div>
                    <h1 className="text-xs md:text-md font-semibold text-gray-400">
                        {otherUserDetails?.firstName} {otherUserDetails?.lastName || ""}
                    </h1>
                    <h1 className="text-md text-gray-800 md:text-xl font-bold">
                        {otherUserDetails?.socialId}{" "}
                        <span className="text-gray-400 text-xs md:text-sm font-normal italic">({otherUserDetails?.accountType})</span>
                    </h1>
                    <p className="text-sm md:text-md text-gray-600">{otherUserDetails?.bio}</p>
                </div>) : (
                        <div>
                            <h1 className="text-xs md:text-md font-semibold text-gray-400">
                                {user?.firstName} {user?.lastName || ""}
                            </h1>
                            <h1 className="text-md text-gray-800 md:text-xl font-bold">
                                {user?.socialId || "You"}{" "}
                                <span className="text-gray-400 text-xs md:text-sm font-normal italic">({user?.accountType})</span>
                            </h1>
                            <p className="text-sm md:text-md text-gray-600">{user?.bio}</p>
                        </div>
            )}

                {/* For larger than mobile screens */} 

            <div className={`hidden md:${selectedPost ? "flex" : "hidden"} lg:flex w-1/2 lg:w-1/3 mx-auto justify-around items-center gap-4`}>
                {
                    ["posts", "followers", "following"].map((item) => (
                        <div key={item} className="flex flex-col items-center cursor-pointer"
                            onClick={() =>{
                                            if(item === "followers"){
                                                if(!isOtherUser) naviagte(`/followers/${user?._id}`);
                                                else naviagte(`/followers/${otherUserDetails?._id}`);
                                            }
                                            if(item === "following") {
                                                if(!isOtherUser) naviagte(`/following/${user?._id}`);
                                                else naviagte(`/following/${otherUserDetails?._id}`);
                                            }
                                        }}
                        >
                            <div className="text-md text-gray-600 font-semibold">                            
                                {isOtherUser ? otherUserDetails?.[item]?.length : user?.[item]?.length}
                            </div>
                            <div className="text-sm text-gray-400">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}


export default ProfileHeader;