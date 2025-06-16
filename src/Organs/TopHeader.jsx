import { BellRing, MessageCircleMore, SquarePen } from "lucide-react";
import SearchBar from "../Molecules/SearchBar";
import image from "../Assets/image.png";
import { useContext } from "react";
import PopUpContext from "../Contexts/PopUpContext";
import { useNavigate } from "react-router-dom";
import NavContext from "../Contexts/NavContext";

function TopHeader() {

    const {setPopUpMode} = useContext(PopUpContext);

    const {setNavSelected} = useContext(NavContext);

    const navigate = useNavigate();

    return (
      <div className="w-full h-14 md:h-20 flex items-center justify-between px-4 border-b border-gray-300 shadow-md shadow-gray-300 bg-white">
        
            {/* Logo */}
          <div className="flex items-center gap-2 text-blue-500 font-bold text-2xl">
              <img src={image} alt="logo" className="w-10 h-10 mt-1" />
              <h1 className="text-xl sm:text-2xl">ConnectMe</h1>
          </div>

            {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex w-1/2 justify-center">
              <SearchBar /> 
          </div>

            {/* Icons */}
          <div className="flex items-center gap-4">
              <BellRing 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 cursor-pointer hover:text-gray-800" 
                  onClick={() => {
                        navigate("/notifications");
                        setNavSelected("Notifications");
                    }}
              />
              <MessageCircleMore 
                  className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 cursor-pointer hover:text-gray-800" 
                  onClick={() => navigate("/chats")}
              />

              {/* Create New - hidden on mobile */}
              <div 
                  className="hidden lg:flex items-center gap-2 border border-gray-300 rounded-xl py-2 px-4 cursor-pointer hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => setPopUpMode("createPost")}
              >
                  <SquarePen className="w-5 h-5 text-gray-500" />
                  <p className="text-sm">Create New</p>
              </div>
            </div>
        </div>
    );
}

export default TopHeader;
