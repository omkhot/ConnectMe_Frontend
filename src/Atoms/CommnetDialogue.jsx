import { useContext } from "react";
import changeDateFormat from "../Utils/DateFormater";
import UserData from "../Contexts/UserData";

function CommentDialougue({commentDetails}){
    const {comment, user, createdAt} = commentDetails;

    const {user: loggedInUser} = useContext(UserData);

    return(
        <>
            <div>
                <div className="flex items-center md:p-4 bg-white ">
                    <div>
                        <img 
                            src={user?.profileImage || "https://via.placeholder.com/150"}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xs md:text-md font-bold">{user?.socialId == loggedInUser?.socialId ? "You" : user?.socialId}</h2>
                            <span className="text-xs text-gray-400">{changeDateFormat(createdAt)}</span>
                        </div>

                        <div>
                            <p className="text-sm md:text-md text-gray-700">{comment}</p>
                        </div>
                    </div>

                </div>
               
            </div>
        </>
    )
}

export default CommentDialougue;