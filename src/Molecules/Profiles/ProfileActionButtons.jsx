import { Share, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProfileActionButtons(){

    const navigate = useNavigate();

    return(
        <div className="mt-4 w-full flex items-center gap-2">
            <button className="w-1/2 md:w-[150px]" onClick={() => navigate("/profile/edit")}>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl py-2 px-4 cursor-pointer hover:bg-gray-100 hover:text-gray-800">
                    <SquarePen className="w-5 h-5 text-gray-500" />
                    <p className="text-sm">Edit Profile</p>
                </div>
            </button>
            <button className="w-1/2 md:w-[150px]">
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl py-2 px-4 cursor-pointer hover:bg-gray-100 hover:text-gray-800">
                    <Share className="w-5 h-5 text-gray-500" />
                    <p className="text-sm">Share Profile</p>
                </div>
            </button>
        </div>
    )
}

export default ProfileActionButtons;