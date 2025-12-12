import axios from 'axios';

const BASE_URL = "https://devops-ai-agent-fastiapi.onrender.com";

const api = axios.create({
    baseURL: BASE_URL,   // ✔ FIXED HERE
    headers: {
        'Content-Type': 'application/json',
    },
});

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
