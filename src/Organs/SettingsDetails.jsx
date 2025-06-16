import { BiLeftArrowAlt, BiLike, BiComment, BiShare, BiBookmark } from "react-icons/bi";
import { MdEdit, MdPassword, MdDelete, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAccountActions from "../Utils/AccountFunctions";
import PopUpWrapper from "../Hooks/PopUpWrapper";
import DeleteAccountCard from "../Molecules/DeleteAccCard";
import { useContext } from "react";
import PopUpContext from "../Contexts/PopUpContext";
import SettingsTabContext from "../Contexts/SettingsTabContext";

function SettingsDetails(){

    const navigate = useNavigate();

    const { setPopUpMode, popUpMode } = useContext(PopUpContext);

    const { handleLogOut, handleDeleteAccount } = useAccountActions();

    const { setSettingsTab, settingsTab } = useContext(SettingsTabContext);

    const personalInfo = [
        { label: "Likes", icon: <BiLike className="w-5 h-5 text-gray-500" />, onClickHandler: () => setSettingsTab("likesPosts") },
        { label: "Comments", icon: <BiComment className="w-5 h-5 text-gray-500"  />, onClickHandler: () => setSettingsTab("allComments") },
        { label: "Saved", icon: <BiBookmark className="w-5 h-5 text-gray-500" />, onClickHandler: ()=> navigate('/saved') },
    ];

    const accountInfo = [
        { label: "Profile Update", icon: <MdEdit className="w-5 h-5 text-gray-500" />, onClickHandler: () => navigate('/profile/edit') },
        { label: "Change Password", icon: <MdPassword className="w-5 h-5 text-gray-500" /> },
        { label: "Delete Account", icon: <MdDelete className="w-5 h-5 text-red-500" />, onClickHandler: () => setPopUpMode("deleteAccount") },
        { label: "Logout", icon: <MdLogout className="w-5 h-5 text-gray-500" />, onClickHandler: handleLogOut },
    ];

    return(
        <>
            <div className="w-[100%] h-[100%] md:h-[85%] md:mt-5">

                <div className="flex items-center space-x-3 p-2 rounded-md">
                    <BiLeftArrowAlt className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800" onClick={() => window.history.back()}  />
                    <h1 className="text-xl font-bold text-gray-600">Settings</h1>
                </div>

                <div className="mt-5 h-[100%] md:w-1/2 flex flex-col space-y-2 ml-10 md:ml-15">
                    
                    <h1 className="text-sm font-semibold text-gray-600">Media Information</h1>
                    {personalInfo.map((item, index) => (
                        <div 
                            onClick={item.onClickHandler}
                            key={index} className="flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100">
                            {item.icon}
                            <h1 className="text-md font-bold text-gray-700">{item.label}</h1>
                        </div>
                    ))}                    

                    <h1 className="text-sm font-semibold text-gray-600 mt-5">Account Information</h1>

                    {accountInfo.map((item, index) => (
                        <div 
                            onClick={item.onClickHandler}
                            key={index} 
                            className="flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                        >
                            {item.icon}
                            <h1 className="text-md font-bold text-gray-700">{item.label}</h1>
                        </div>
                    ))}

                </div>

            </div>

            {popUpMode === "deleteAccount" && (
                                    <PopUpWrapper>
                                        <DeleteAccountCard />
                                    </PopUpWrapper>
            )}
        </>
    )
}

export default SettingsDetails;