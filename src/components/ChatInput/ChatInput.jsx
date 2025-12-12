import React, { useState, useRef } from "react";
import { Send, StopCircle, Paperclip } from "lucide-react";
import clsx from "clsx";
import useChatStore from "../../store/useChatStore";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Zustand imports
  const currentChatId = useChatStore((s) => s.currentChatId);
  const addMessage = useChatStore((s) => s.addMessage);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const setStreaming = useChatStore((s) => s.setStreaming);
  const setLoading = useChatStore((s) => s.setLoading);
  const setStreamingContent = useChatStore((s) => s.setStreamingContent);
  const addToolEvent = useChatStore((s) => s.addToolEvent);
  const clearToolEvents = useChatStore((s) => s.clearToolEvents);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    if (!currentChatId) {
      alert("Create a chat first.");
      return;
    }

    const messageText = input.trim();
    setInput("");

    // Add USER message to UI
    addMessage({
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      createdAt: new Date().toISOString(),
    });

    // Reset state for streaming
    setStreaming(true);
    setLoading(true);
    setStreamingContent("");
    clearToolEvents();

    const url = `http://localhost:8000/agent/stream?message=${encodeURIComponent(
      messageText
    )}&chat_id=${currentChatId}`;

    console.log("AGENT SSE URL:", url);

    const es = new EventSource(url);
    window.activeStream = es;

    // ---------------------------
    // 1️⃣ MAIN ASSISTANT MESSAGE
    // ---------------------------
    es.addEventListener("message", (event) => {
      if (!event.data) return;
      let parsed;

      try {
        parsed = JSON.parse(event.data);
      } catch (error) {
        console.warn("Invalid JSON in message:", event.data);
        return;
      }

      // Add ASSISTANT final message to messages[]
      useChatStore.getState().addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: parsed.content,
        createdAt: new Date().toISOString(),
      });

      useChatStore.getState().setStreamingContent(null);
    });

    // ---------------------------
    // 2️⃣ TOOL CALL EVENTS
    // ---------------------------
    es.addEventListener("tool_call", (event) => {
      try {
        const data = JSON.parse(event.data);
        addToolEvent({ type: "tool_call", data });
      } catch (err) {
        console.error("Invalid tool_call event:", err);
      }
    });

    // ---------------------------
    // 3️⃣ TOOL OUTPUT EVENTS
    // ---------------------------
    es.addEventListener("tool_output", (event) => {
      try {
        const data = JSON.parse(event.data);
        addToolEvent({ type: "tool_output", data });
      } catch (err) {
        console.error("Invalid tool_output event:", err);
      }
    });

    // ---------------------------
    // 4️⃣ END EVENT (finish stream)
    // ---------------------------
    es.addEventListener("end", () => {
      setStreaming(false);
      setLoading(false);
      setStreamingContent("");
      es.close();
    });

    // ---------------------------
    // 5️⃣ ERROR EVENT (fallback)
    // ---------------------------
    es.addEventListener("error", (event) => {
      console.error("SSE error:", event);
      setStreaming(false);
      setLoading(false);
      es.close();
    });
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative flex items-end gap-2 bg-gray-800/50 p-3 border border-gray-700 rounded-xl">
        <button className="text-gray-400 hover:text-white">
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Message your DevOps Agent..."
          className="flex-1 bg-transparent resize-none outline-none text-gray-100 placeholder-gray-400"
          rows={1}
        />

        {isStreaming ? (
          <button
            onClick={() => {
              if (window.activeStream) window.activeStream.close();
              setStreaming(false);
              setLoading(false);
            }}
            className="p-2 bg-red-600 text-white rounded-lg"
          >
            <StopCircle size={20} />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={clsx(
              "p-2 rounded-lg transition-all",
              input.trim()
                ? "bg-white text-black"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;







       
