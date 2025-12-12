import React, { useEffect } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import clsx from "clsx";
import useChatStore from "../../store/useChatStore";
import { chatService } from "../../services/api.js";

const ChatList = () => {
  const {
    chats,
    setChats,
    currentChatId,
    setCurrentChatId,
    setMessages,
    deleteChat,
  } = useChatStore();

  // load once on mount — empty deps prevents multiple loads (React 18 strict mode double-run avoided)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const list = await chatService.getChats();
        if (!cancelled) setChats(list);
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };
    load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChat = async (id) => {
    // set selection first
    setCurrentChatId(id);
    // then load messages for UI
    try {
      const res = await chatService.getMessages(id);
      setMessages(res.messages || []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    // optimistic UI
    deleteChat(id);
    try {
      await chatService.deleteChat(id);
    } catch (err) {
      console.error("Failed to delete chat:", err);
      // optional: re-load chats on failure
      try {
        const list = await chatService.getChats();
        setChats(list);
      } catch {}
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => handleSelectChat(chat.id)}
          className={clsx(
            "group flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors relative",
            currentChatId === chat.id
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-800/50"
          )}
        >
          <MessageSquare size={16} className="shrink-0" />
          <span className="truncate flex-1 text-left">{chat.title}</span>

          <div
            className={clsx(
              "absolute right-2 flex items-center gap-1",
              currentChatId === chat.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <button
              onClick={(e) => handleDelete(e, chat.id)}
              className="p-1 hover:text-red-400 text-gray-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;
