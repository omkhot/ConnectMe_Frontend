import { BiLeftArrow } from "react-icons/bi";
import TopHeader from "../Organs/TopHeader";
import LeftNavBar from "../Organs/LeftNavBar";
import SettingsDetails from "../Organs/SettingsDetails";
import { useContext } from "react";
import SettingsTabContext from "../Contexts/SettingsTabContext";
import LikesPost from "../Organs/LikesPosts";
import AllComments from "../Organs/AllComments";

function SettingsPage(){

    const { setSettingsTab, settingsTab } = useContext(SettingsTabContext);

    return(
        <>
            <div className="w-[100%] min-h-screen flex flex-col">

                {/* Top Header */}

                <div className="w-[100%] border-b border-gray-300 bg-white z-50 fixed top-0 left-0">
                    <TopHeader />
                </div>

                {/* Page Content */}

                <div className="w-[100%] flex flex-1 pt-[70px]">

                    {/* Sidebar */}

                    <div className="w-[25%] z-15 fixed top-[70px] lg:w-[18%]">
                        <LeftNavBar />
                    </div>

                    {/* Main Content */}

                    {settingsTab === "main" && (
                                <div className="w-full md:w-[70%] md:ml-[25%] lg:w-[75%] lg:ml-[20%]">
                                    <SettingsDetails />
                                </div>
                    )}

                    {settingsTab === "likesPosts" && (
                                <div className="w-full md:w-[70%] md:ml-[25%] lg:w-[75%] lg:ml-[20%]">
                                    <LikesPost />
                                </div>
                    )}

                    {settingsTab === "allComments" && (
                                <div className="w-full md:w-[70%] md:ml-[25%] lg:w-[75%] lg:ml-[20%]">
                                    <AllComments />
                                </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SettingsPage;