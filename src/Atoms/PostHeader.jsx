import { BsThreeDotsVertical } from "react-icons/bs";
import changeDateFormat from "../Utils/DateFormater";
import ProfileImage from "./ProfileImage";
import { useContext, useState } from "react";
import UserData from "../Contexts/UserData";
import usePostsMethods from "../Hooks/PostHook";
import EditPostBox from "./EditPostBox";

function PostHeader({post, isFromProfile}){

    const {user} = useContext(UserData);

    const [dotsOpen, setDotsOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);

    const {deleteMyPost} = usePostsMethods(post);

    const onDeleteClick = () => {
        deleteMyPost();
    }
    
    return(
        <>
            {(isFromProfile == false || user._id != post.user) && <div className="flex items-center p-4">
                <div>
                    <ProfileImage url={post.user?.profileImage} styling="w-10 h-10 rounded-full object-cover mr-3" />
                </div>
                
                <div>
                    <h2 className="text-md font-bold">{post.user?.socialId}</h2>
                    <span className="text-xs text-gray-500">{changeDateFormat(post.createdAt)}</span>
                </div>                
            </div>}

            {(isFromProfile == true && user._id == post.user) &&(
                <div className="flex items-center p-4 relative">                                     
                    <div>
                        <h2 className="text-md font-bold">You</h2>
                        <span className="text-xs text-gray-500">{changeDateFormat(post.createdAt)}</span>
                    </div>    

                    <div className="ml-auto">
                        <BsThreeDotsVertical 
                            onClick={() => setDotsOpen(!dotsOpen)} 
                            className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800" 
                        />

                        {dotsOpen && (
                            <div className="absolute top-12 right-4 bg-white border border-gray-200 rounded-md shadow-md z-10">
                                <ul className="py-2">
                                    <li 
                                        onClick={() =>{
                                            setIsEditOpen(true);
                                            setDotsOpen(false);
                                        }}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</li>
                                    <li 
                                        onClick={onDeleteClick} 
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {isEditOpen && (
                        <div className="w-full absolute top-0 left-0 z-50 bg-white">
                            <EditPostBox setIsEditOpen={setIsEditOpen} post={post} />
                        </div>
                    )}            
                </div>
            )}
        </>
    )  
}

export default PostHeader;