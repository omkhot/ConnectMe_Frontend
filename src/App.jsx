import { useContext, useEffect } from 'react';
import './App.css'
import AppRouter from './Hooks/AppRouter';
import { GetUser } from './Axios/UserReq';
import UserData from './Contexts/UserData';
import PopUpWrapper from './Hooks/PopUpWrapper';
import CreateNew from './Organs/CreateNew';
import PopUpContext from './Contexts/PopUpContext';
import socket from './Utils/socketio';
import MsgContext from './Contexts/MsgContext';

function App() {

    const {setUser} = useContext(UserData);
    const {user} = useContext(UserData);
    const {setMessages, messages} = useContext(MsgContext);

    const {popUpMode, setPopUpMode} = useContext(PopUpContext);

    async function getUser() {
      try {
          const loggedUser = await GetUser();
          setUser(loggedUser);
      } catch (error) {
          console.log("Error is coming while getting user: ");
      }        
    }
 
    useEffect(() => {
      getUser();
    }, []);

    useEffect(() => {
      if (user?._id) {
          socket.emit("setUp", user._id);
      }
    }, [user]);
    
    useEffect(()=>{        
        socket.on("newMsg", (data) => {
          console.log("socket data:", data);
          if(!messages.find((msg) => msg._id == data._id)){
            setMessages((prev) => [...prev, data]);
          }
        });

        socket.on("newFollowRequest", (data) => {
            console.log("socket data for follow request:", data);
            setUser(data);
        })

        return () => {
          socket.off("newMsg");
          socket.off("newFollowRequest");
        };
    },[]);

  return (
      <>
        <AppRouter />

        {popUpMode === "createPost" && (
                <PopUpWrapper>
                    <CreateNew /> 
                </PopUpWrapper>
        )}
      </>
  )
}

export default App;
