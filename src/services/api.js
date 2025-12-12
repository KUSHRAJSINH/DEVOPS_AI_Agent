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
        const response = await api.post('/chat/create');
        return response.data;   // { chat_id: "xxxx" }
    },

    getChats: async () => {
        const response = await api.get('/chats');
        return response.data;
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
