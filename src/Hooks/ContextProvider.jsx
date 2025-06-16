import { useEffect, useState } from "react";
import UserData from "../Contexts/UserData";
import AuthService from "../Contexts/AuthService";
import PopUpContext from "../Contexts/PopUpContext";
import ChatContext from "../Contexts/ChatContext";
import MsgContext from "../Contexts/MsgContext";
import { validateAuth } from "../Axios/AuthRequests";
import SettingsTabContext from "../Contexts/SettingsTabContext";
import NavContext from "../Contexts/NavContext";

function AppContextProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const [user, setUser] = useState(null);  
    const [loginMode, setLoginMode] = useState(true);
    const [popUpMode, setPopUpMode] = useState(false);
    const [chatSection, setChatSection] = useState(null);
    const [messages, setMessages] = useState([]);

    const [settingsTab, setSettingsTab] = useState("main");

    const [navSelected, setNavSelected] = useState("Home");


    const validationUser = async () => {
        try {
            const user = await validateAuth();
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            }
            setAuthLoading(false);
        } catch (error) {
            console.log("error from validationUser: ", error);
            setAuthLoading(false);
        }
        
    }

    useEffect(()=>{
        validationUser();
    },[]);

    return (
        <>
            <UserData.Provider value={{user, setUser}} >
                <AuthService.Provider value={{loginMode, setLoginMode, isAuthenticated, setIsAuthenticated, authLoading, setAuthLoading}} >
                    <PopUpContext.Provider value={{popUpMode, setPopUpMode}} >
                        <ChatContext.Provider value={{chatSection, setChatSection}} >
                            <MsgContext.Provider value={{messages, setMessages}} >
                                <SettingsTabContext.Provider value={{settingsTab, setSettingsTab}} >
                                    <NavContext.Provider value={{navSelected, setNavSelected}} >
                                        {children}
                                    </NavContext.Provider>
                                </SettingsTabContext.Provider>
                            </MsgContext.Provider>
                        </ChatContext.Provider>
                    </PopUpContext.Provider>
                </AuthService.Provider>
            </UserData.Provider>
        </>
    )
}

export default AppContextProvider;