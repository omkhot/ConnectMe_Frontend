import { useEffect, useRef, useState } from "react";
import { fetchChatMessages, sendChatMessage } from "../Axios/ChatMsg";

export default function useChatHandler(conversion, user, setMessages) {

    const [msg, setMsg] = useState("");
    const [receiverId, setReceiverId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getMessages = async () => {
        try {
        const res = await fetchChatMessages(conversion._id);
        setMessages(res.data);
        } catch (err) {
        console.error("Error fetching chat messages:", err);
        }
    };

    const sendMessage = async () => {
        if (!msg.trim()) return;
        const data = {
        chatId: conversion._id,
        sender: user._id,
        receiver: receiverId,
        message: msg,
        };

        try {
        await sendChatMessage(data);
        setMsg("");
        getMessages(); // refetch messages
        } catch (err) {
        console.error("Send failed:", err);
        }
    };

    useEffect(() => {
        if (conversion && user) {
        const other = conversion.members.find((m) => m._id !== user._id);
        if (other) setReceiverId(other._id);
        }
    }, [conversion, user]);

    useEffect(() => {
        if (conversion?._id) getMessages();
    }, [conversion]);

    useEffect(() => {
        scrollToBottom();
    }, [setMessages]);

    return {
        msg,
        setMsg,
        sendMessage,
        messagesEndRef,
    };
    
}
