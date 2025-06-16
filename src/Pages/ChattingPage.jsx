import { useContext } from "react";
import ChatList from "../Organs/ChatList";
import ChattingSection from "../Organs/ChattingSection";
import ChatContext from "../Contexts/ChatContext";

function ChattingPage() {

    const {chatSection} = useContext(ChatContext);

    return(
        <div className="flex h-screen">

            <div className={`w-full ${chatSection && "hidden md:block"} md:w-1/4 h-screen md:border-r p-4`}>
                <ChatList />
            </div>

            <div className="w-3/4 hidden md:block">
                {chatSection ? <ChattingSection conversion={chatSection} /> : <div className="flex items-center justify-center h-full"><h1 className="text-2xl font-bold">Select a chat to start chatting</h1></div>}
            </div>

            {chatSection && (
                <div className="w-full md:hidden">
                    <ChattingSection conversion={chatSection} />
                </div>
            )}
        </div>
    )
}

export default ChattingPage;