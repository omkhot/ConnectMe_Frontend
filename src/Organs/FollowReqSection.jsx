import { useContext, useEffect, useState } from "react";
import UserData from "../Contexts/UserData";
import { acceptFollowRequest, deleteFollowRequest, fetchAllRequests, fetchAllSentRequests } from "../Axios/FollowFollowing";
import { BsExclamationCircle } from "react-icons/bs";
import { BellRing } from "lucide-react";

function FollowReqSection(){

    const {user} = useContext(UserData);

    const [followReq, setFollowReq] = useState([]);

    const [sentFollowReq, setSentFollowReq] = useState([]);

    const getAllReq = async () => {
        try {
            const res = await fetchAllRequests(user?._id);
            const resData = res.data.followRequests;
            console.log("resData from getAllReq: ", res.data);
            setFollowReq(resData);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }

    const getAllSentReq = async () => {
        try {
            const res = await fetchAllSentRequests(user?._id);
            const resData = res.data.sentFollowRequests;
            console.log("resData from getAllSentReq: ", res.data);
            setSentFollowReq(resData);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }

    const acceptFollowReq = async (id) => {
        const details = {
            senderId : id,
            receiverId : user._id
        }
        try {
            const res = await acceptFollowRequest(details);
            console.log("res from acceptFollowReq: ", res.data);
            alert(res.data.message);
        } catch (error) {
            console.error("Error accepting follow request:", error);
        }
    }

    const deleteFollowReq = async (id) => {
        console.log("Deletion of request hits")
        const details = {
            senderId : id,
            receiverId : user._id
        }
        try {
            const res = await deleteFollowRequest(details);
            console.log("res from deleteFollowReq: ", res.data);
            alert(res.data.message);            
        } catch (error) {
            console.error("Error deleting follow request:", error);
        }
    }
 
    useEffect(() => {
        getAllReq();
        getAllSentReq();
    }, [user]);

    return(
        <>
            <div className=" w-[100%] h-[80vh] px-4 overflow-y-auto md:border-l-2 border-gray-400 ">
                <div className="w-full sticky top-0">
                    <h1 className="text-md font-semibold text-gray-600 flex gap-4 items-center">
                        <BellRing />
                        Notifications
                    </h1>
                </div>

                <div className="w-full mt-5 grid grid-cols-1 gap-4">

                    {(followReq?.length == 0 && sentFollowReq?.length == 0) && (
                        <> 
                            <div className="w-full h-[60vh] flex flex-col items-center justify-center mt-10">
                                <BsExclamationCircle className="text-3xl text-gray-500 text-center" />
                                <p className="text-sm text-gray-600 italic">No Notifications</p>
                            </div>
                        </>
                    )} 

                    {followReq?.length > 0 && followReq?.map((user) => (
                        <div key={user._id} className="w-full flex items-center p-2 hover:bg-gray-50 transition duration-200 hover:shadow-md border border-gray-300 rounded-lg">
                            <img 
                                src={user.profileImage} 
                                alt="Profile" 
                                className="w-10 h-10 lg:w-24 lg:h-24 rounded-full mr-2" 
                            />

                            <div className="w-full flex flex-col items-center">
                                <div className="w-full flex flex-col items-center">
                                    <p className="italic"> <span className="font-semibold normal"> {user.socialId}  </span>likes to follow you..</p>
                                </div>
                                <div className="w-full flex justify-center gap-2">
                                    <button 
                                        onClick={() => acceptFollowReq(user._id)}
                                        className="bg-blue-500 text-center hover:bg-blue-600 text-white px-10 py-2 rounded-md mt-2 cursor-pointer"
                                    >
                                        Accept
                                    </button>

                                    <button 
                                        onClick={() => deleteFollowReq(user._id)}
                                        className="bg-red-500 text-center hover:bg-red-600 text-white px-10 py-2 rounded-md mt-2 cursor-pointer">
                                        Decline
                                    </button>

                                </div>
                            </div>
                                
                        </div>
                    ))}

                    {sentFollowReq?.length > 0 && sentFollowReq?.map((user) => (
                        <div key={user._id} className="w-full flex items-center p-2 hover:bg-gray-50 transition duration-200 hover:shadow-md border border-gray-300 rounded-lg">
                            <img 
                                src={user.profileImage} 
                                alt="Profile" 
                                className="w-10 h-10 lg:w-16 lg:h-16 rounded-full mr-2" 
                            />

                            <div className="w-full flex flex-col items-center">
                                <div className="w-full flex flex-col items-center">
                                    <p className="italic text-sm"> You have sent follow request to <span className="font-semibold normal"> {user.socialId}  </span></p>
                                </div>
                                <div className="w-full flex justify-center gap-2">
                                    <button className="bg-red-500 text-center hover:bg-red-600 text-white px-10 py-1 rounded-md mt-2 cursor-pointer">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                                
                        </div>
                    ))}

                </div>
                
            </div>
        </>
    )
}

export default FollowReqSection;