import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import ChatMessage from "../components/ChatMessage/ChatMessage";
import ChatInput from "../components/ChatInput/ChatInput";
import ToolEventMessage from "../components/ChatMessage/ToolEventMessage";
import { chatService } from "../services/api";

const ChatPage = () => {
    // Zustand selectors
    const messages = useChatStore((s) => s.messages);
    const toolEvents = useChatStore((s) => s.toolEvents);
    const currentChatId = useChatStore((s) => s.currentChatId);
    const addChat = useChatStore((s) => s.addChat);
    const setCurrentChatId = useChatStore((s) => s.setCurrentChatId);
    const setMessages = useChatStore((s) => s.setMessages);

    const initRef = React.useRef(false);

    // ⭐ AUTO-INIT NEW CHAT WHEN PAGE LOADS ⭐
    useEffect(() => {
        if (initRef.current) return; // Prevent StrictMode double-run
        initRef.current = true;

        const initChat = async () => {
            if (!currentChatId) {
                try {
                    const res = await chatService.createChat();
                    const id = res.chat_id;

                    addChat({ id, title: "New Chat" });
                    setCurrentChatId(id);
                    setMessages([]);

                    console.log("🟢 Auto-created initial chat:", id);
                } catch (err) {
                    console.error("Failed to auto-create chat:", err);
                }
            }
        };

        initChat();
    }, [currentChatId, addChat, setCurrentChatId, setMessages]);

    return (
        <div className="flex flex-col w-full h-full px-4 py-6 overflow-auto">
            <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto flex-1">

                {/* ⭐ Render all user + assistant chat messages */}
                {messages.map((m) => (
                    <ChatMessage key={m.id} message={m} />
                ))}

                {/* ⭐ Render tool events (tool_call, tool_output, error) */}
                {toolEvents.map((event, i) => (
                    <ToolEventMessage key={`tool-${i}`} event={event} />
                ))}

                {/* ❌ REMOVED — old streamingContent UI that blocked output */}
            </div>

            {/* Chat Input */}
            <ChatInput />
        </div>
    );
};

export default ChatPage;
