import { useContext} from "react";
import UserData from "../Contexts/UserData";
import MsgContext from "../Contexts/MsgContext";
import formatTo12HourTime from "../Utils/TimeFormater";
import { BiLeftArrow } from "react-icons/bi";
import ChatContext from "../Contexts/ChatContext";
import { FaLocationArrow } from "react-icons/fa";
import useChatHandler from "../Hooks/ChattingHook";

function ChattingSection({conversion}){

    console.log("conversion", conversion);

    const {setChatSection} = useContext(ChatContext);

    const {user} = useContext(UserData);    

    const {messages} = useContext(MsgContext);
    const {setMessages} = useContext(MsgContext);

    const {
        msg,
        setMsg,
        sendMessage,
        messagesEndRef,
    } = useChatHandler(conversion, user, setMessages);

  const otherMember = conversion?.members?.find((m) => m._id !== user._id);    

    return(
        <>
            <div className="w-[100%] h-[100vh] flex flex-col overflow-hidden relative">
                <div className="w-[100%] bg-gray-700 h-20 flex items-center justify-between px-4 fixed top-0">
                    {otherMember && (
                        <div className="flex items-center gap-4">
                            <img src={otherMember.profileImage} alt="profile" className="w-15 h-15 rounded-full" />
                            <div>
                                <h3 className="text-lg text-white font-semibold">{otherMember.socialId}</h3>
                                <p className="text-xs text-gray-200">
                                    {otherMember.firstName} {otherMember.lastName}
                                </p>
                            </div>
                        </div>
                    )}

                    <div>
                        <BiLeftArrow className="md:hidden w-4 h-4 text-white cursor-pointer" onClick={() => setChatSection(null)} />
                    </div>
                </div>


                <div className="w-[100%] h-[82vh] mt-20 flex flex-col overflow-y-scroll p-4 space-y-2 ">
                    {messages?.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-md p-2 rounded-lg ${
                                msg.sender._id === user._id
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-200 text-black mr-auto"
                            }`}
                        >
                            {msg.message}
                            <div className="text-xs text-gray-600 text-right">
                                {formatTo12HourTime(msg.createdAt)}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="w-[100%] absolute bottom-2 flex items-center justify-between px-4 bg-white">
                    <input 
                        type="text"
                        placeholder="Type a message..."
                        className="w-[92%] p-2 border border-gray-300 rounded-lg"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                    />
                    <button 
                        onClick={sendMessage} 
                        className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full"
                    >
                        <FaLocationArrow className="text-white w-4 h-4" />
                    </button>
                </div>

            </div>
        </>
    )
}

export default ChattingSection;