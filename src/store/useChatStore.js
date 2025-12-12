import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useChatStore = create(
  devtools((set) => ({
    chats: [],
    currentChatId: null,
    messages: [],
    isLoading: false,
    isStreaming: false,
    streamingContent: "",
    toolEvents: [],          // NEW → store tool output
    mode: "auto",            // NEW → agent auto router mode

    setMode: (mode) => set({ mode }),

    // Safe setters
    setChats: (chats) =>
      set({ chats: Array.isArray(chats) ? chats : [] }),

    addChat: (chat) =>
      set((state) => ({
        chats: Array.isArray(state.chats)
          ? [chat, ...state.chats]
          : [chat],
      })),

    setCurrentChatId: (id) => set({ currentChatId: id }),

    setMessages: (messages) =>
      set({ messages: Array.isArray(messages) ? messages : [] }),

    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, message],
      })),

    addToolEvent: (event) =>
      set((state) => ({
        toolEvents: [...state.toolEvents, event],
      })),

    clearToolEvents: () =>
      set({
        toolEvents: [],
      }),

    updateLastMessage: (content) =>
      set((state) => {
        const messages = [...state.messages];
        if (messages.length > 0) {
          messages[messages.length - 1].content = content;
        }
        return { messages };
      }),

    setLoading: (loading) => set({ isLoading: loading }),
    setStreaming: (streaming) => set({ isStreaming: streaming }),
    setStreamingContent: (content) => set({ streamingContent: content }),

    deleteChat: (id) =>
      set((state) => ({
        chats: state.chats.filter((c) => c.id !== id),
        currentChatId:
          state.currentChatId === id ? null : state.currentChatId,
        messages:
          state.currentChatId === id ? [] : state.messages,
      })),

    clearMessages: () => set({ messages: [] }),
  }))
);

export default useChatStore;
