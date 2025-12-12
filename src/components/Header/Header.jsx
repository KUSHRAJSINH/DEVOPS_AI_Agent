import React from 'react';
import { Menu, Share, MoreHorizontal } from 'lucide-react';
import useChatStore from '../../store/useChatStore';

const Header = ({ toggleSidebar, isMobile }) => {
    const { chats, currentChatId } = useChatStore();

    const currentChat = chats.find(c => c.id === currentChatId);
    const title = currentChat ? currentChat.title : 'New Chat';

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between p-2 text-gray-200 bg-gray-900/80 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-2 overflow-hidden">
                {isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                )}
                <h1 className="text-sm font-medium truncate px-2 cursor-pointer hover:bg-gray-800 rounded-md py-1 transition-colors">
                    {title} <span className="text-gray-500 ml-2 text-xs">GPT-4o</span>
                </h1>
            </div>

            <div className="flex items-center gap-1">
                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                    <Share size={18} />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                    <MoreHorizontal size={18} />
                </button>
            </div>
        </div>
    );
};

export default Header;







