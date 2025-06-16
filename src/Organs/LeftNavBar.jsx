import { useContext } from "react";
import NavItem from "../Atoms/NavItems";
import UserData from "../Contexts/UserData";
import { useNavigate } from "react-router-dom";
import PopUpContext from "../Contexts/PopUpContext";
import useAccountActions from "../Utils/AccountFunctions";
import ProfileImage from "../Atoms/ProfileImage";
import NavContext from "../Contexts/NavContext";

function LeftNavBar() {
    const { user } = useContext(UserData);
    const { setPopUpMode } = useContext(PopUpContext);
    const navigate = useNavigate();

    const {navSelected, setNavSelected} = useContext(NavContext);
    
    const {handleLogOut} = useAccountActions();

    const navItems = [
        { label: "Home", path: "/home", icon: "https://api.iconify.design/mdi:home-circle.svg?color=%230079f2" },
        { label: "Explore", path: "/explore", icon: "https://api.iconify.design/mdi:compass.svg?color=%23f59e0b" },
        { label: "Messages", path: "/chats", icon: "https://api.iconify.design/mdi:message-text.svg?color=%236b7280" },
        { label: "Notifications", path: "/notifications", icon: "https://api.iconify.design/mdi:bell.svg?color=%23ef4444" },
        { label: "Friends", path: `/following/${user?._id}`, icon: "https://api.iconify.design/mdi:account-group.svg?color=%238b5cf6" },
        { label: "Saved", path: "/saved", icon: "https://api.iconify.design/mdi:bookmark.svg?color=%234b5563" },
        { label: "Settings", path: "/settings", icon: "https://api.iconify.design/mdi:cog.svg?color=%23659e34" },
        { label: "Logout", path: null, icon: "https://api.iconify.design/mdi:logout.svg?color=%23dc2626", action: handleLogOut }
    ];

    return (
        <div className="w-[100%] border-r border-gray-200 shadow-md">
            <div className="hidden md:flex p-4 flex flex-col justify-between  h-screen border-r border-gray-300">
                
                {/* Top Section */}

                <div>
                    <div
                        className={`w-full flex items-center justify-center space-x-3 mt-5 mb-10 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${navSelected === "Profile" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                            navigate("/profile");
                            setNavSelected("Profile");
                        }}
                    >
                        <div>
                            <ProfileImage url={user?.profileImage} styling={"w-16 h-16 rounded-full object-cover"} />
                        </div>                        
                        <span className="hidden md:block w-2/3 font-semibold text-sm">
                            Hello, {user?.socialId || "You"}
                        </span>
                    </div>

                    <nav className="space-y-4">
                        {navItems.map(({ label, path, icon, action }) => (
                            <NavItem
                                key={label}
                                icon={<img src={icon} alt={label} className="w-6 h-6" />}
                                label={label}
                                onClickHandler={() => {
                                    if (action) {
                                        action();
                                    } else {
                                        navigate(path);
                                    }
                                    setNavSelected(label);
                                }}
                                isSelected={navSelected === label}
                            />
                        ))}
                    </nav>
                </div>

            </div>

            {/* Mobile Bottom Nav */}

            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center h-14 md:hidden z-100">
                <img
                    src="https://api.iconify.design/mdi:home-circle.svg?color=%230079f2"
                    alt="Home"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => navigate("/home")}
                />
                <img
                    src="https://api.iconify.design/mdi:compass.svg?color=%23f59e0b"
                    alt="Explore"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => navigate("/explore")}
                />
                <img
                    src="https://api.iconify.design/mdi:plus-circle.svg?color=%231ca7ec"
                    alt="Create"
                    className="w-7 h-7 cursor-pointer"
                    onClick={() => setPopUpMode("createPost")}
                />
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate("/profile")}
                >
                    <ProfileImage url={user?.profileImage} alt="avatar" styling="w-8 h-8 rounded-full object-cover border border-gray-200" />
                </div>
            </div>

        </div>
    );
}


export default LeftNavBar;