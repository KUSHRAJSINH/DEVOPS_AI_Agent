import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import ChatList from "./ChatList";
import UserProfile from "./UserProfile";
import useChatStore from "../../store/useChatStore";
import { chatService } from "../../services/api.js";

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
const { addChat, setCurrentChatId, setMessages } = useChatStore();

const handleNewChat = async () => {
  try {
    const res = await chatService.createChat();
    const id = res?.chat_id;
    if (!id) throw new Error("No chat_id returned");

    const newChat = { id, title: "New Chat" };

    // Append safely
    addChat(newChat);

    // Select chat immediately
    setCurrentChatId(id);

    // Reset messages
    setMessages([]);
  } catch (err) {
    console.error("Failed to create new chat:", err);
    alert("Failed to create chat — check backend");
  }
};

  const sidebarVariants = {
    open: { x: 0, width: "260px", opacity: 1 },
    closed: { x: "-100%", width: 0, opacity: 0 },
  };

  const mobileVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />
      )}

      <motion.div
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={isMobile ? mobileVariants : sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx(
          "flex flex-col h-full bg-gray-900 text-gray-100 border-r border-gray-800 z-50",
          isMobile ? "fixed top-0 left-0 w-[260px]" : "relative"
        )}
      >
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors text-sm text-left"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          <ChatList />
        </div>

        <div className="p-3 border-t border-gray-800">
          <UserProfile />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
