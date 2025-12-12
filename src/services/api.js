import axios from 'axios';

const BASE_URL = "https://devops-ai-agent-fastiapi.onrender.com";



const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✔ FIXED: createChat must not send body
export const chatService = {
    createChat: async () => {
    const res = await fetch(`${BASE_URL}/chat/create`, { method: "POST" });
    return res.json();
  },

  getChat: async (id) => {
    const res = await fetch(`${BASE_URL}/chat/${id}`);
    return res.json();
  },

    getMessages: async (chatId) => {
        const response = await api.get(`/chat/${chatId}`);
        return response.data;
    },

    deleteChat: async (chatId) => {
        const response = await api.delete(`/chat/${chatId}`);
        return response.data;
    },
};

export default api;
