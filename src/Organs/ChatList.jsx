import { useContext, useEffect, useState } from "react";
import { createNewChat, fetchAllChats } from "../Axios/ChatMsg";
import  UserData from "../Contexts/UserData";
import image from "../assets/image.png";
import { IoCreateOutline, IoPersonAddOutline } from "react-icons/io5";
import { fetchAllFollowers } from "../Axios/FollowFollowing";
import ChatContext from "../Contexts/ChatContext";

function ChatList(){

    const {user} = useContext(UserData);
    const [chats, setChats] = useState([]);

    const [tab, setTab] = useState("chats");

    const [followers, setFollowers] = useState([]);
    const {setChatSection} = useContext(ChatContext);

    const getAllChats = async () => {
        try {
            const res = await fetchAllChats(user._id);
            console.log("res from fetchAllChats", res.data);
            const resData = res.data;
            setChats(resData);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }

    const newChat = async (user2id) => {
        try {
            const members = [user._id, user2id]; 
            const res = await createNewChat(members);
            console.log("res from createNewChat", res.data);
            setChatSection(res.data);
        } catch (error) {
            console.error("Error creating new chat:", error);            
        }
    }

    const getAllFollowers = async () => {
        try {
            const res = await fetchAllFollowers(user._id);
            console.log("res from fetchAllFollowers", res.data);
            const resData = res.data.followers;
            setFollowers(resData);
        } catch (error) {
            console.error("Error fetching followers:", error);
        }
    }

    useEffect(() => {
        getAllChats();
    }, []);

    return (
        <div className="w-[100%]">

            <div className="flex items-center gap-2 text-blue-500 font-bold text-2xl">
                <img src={image} alt="logo" className="w-10 h-10 mt-1" />
                <h1 className="text-lg">ConnectMe</h1>    

                <div className="ml-auto flex items-center justify-between gap-4 p-4 rounded-lg">
                    <h2 className="text-xl text-gray-800 font-bold ">
                        {tab === "chats" ? "Chats" : "New"}
                    </h2>
                    {tab === "chats" && <IoPersonAddOutline className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-800" onClick={() =>{
                                            getAllFollowers();
                                            setTab("followers");
                                        }}/>
                    }
                    {tab === "followers" && <IoCreateOutline className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-800" onClick={() => {
                                                getAllChats();
                                                setTab("chats");
                                            }}/>
                    }
                </div>            
            </div>

            <div>
                <input 
                    type="search"
                    placeholder={`Search ${tab === "chats" ? "in Chats" : "among Followers"}`}
                    className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                />
            </div>
            
            {tab == "chats" && (
                <div className="overflow-y-auto mt-2 h-[80vh] bg-gray-50">
                    {chats?.length === 0 && (
                        <p className="text-gray-600 h-[100%] text-center flex items-center justify-center">No Chats yet...</p>
                    )}
                    {chats?.length > 0 && chats?.map((chat) => (
                        <div key={chat._id} className="p-4 border-b border-gray-300 rounded-lg">
                            {chat?.members?.map((member) => {
                                if (member._id !== user._id) {
                                    return (
                                        <div key={member._id} className="flex items-center gap-2 cursor-pointer" onClick={() => setChatSection(chat)} >
                                            <div>
                                                <img src={member.profileImage} alt="profile" className="w-10 h-10 rounded-full" />
                                            </div>
                                            <div>
                                                <h3 className="text-md font-semibold">{member.socialId}</h3>  
                                                <p className="text-xs text-gray-600">{member.firstName} {member.lastName}</p>                      
                                            </div>
                                             
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))}
                </div>
            )}

            {tab == "followers" && (
                <div className="overflow-y-auto mt-2 h-[75vh] bg-gray-50">
                    {followers?.length === 0 && (
                        <p className="text-gray-600 h-[100%] text-center flex items-center justify-center">No Followers yet...</p>
                    )}
                    {followers?.length > 0 && followers?.map((follower) => (
                        <div key={follower._id} className="p-4 border-b rounded-lg flex items-center gap-2 hover:bg-gray-200 cursor-pointer" onClick={() => newChat(follower._id)}>
                            <div>
                                <img src={follower.profileImage} alt="profile" className="w-10 h-10 rounded-full" />
                            </div>
                            <h3 className="text-md font-semibold">{follower.socialId}</h3>                        
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatList;