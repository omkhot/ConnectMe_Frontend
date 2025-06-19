import {io} from "socket.io-client";

const socket = io("https://connectme-backend-2-h4co.onrender.com", {
    transports: ["websocket"],
    withCredentials: true
});

export default socket;