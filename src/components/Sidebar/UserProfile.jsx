import React from 'react';
import { User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import useThemeStore from '../../store/useThemeStore';

const UserProfile = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <div className="flex flex-col gap-1">
            <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors text-sm w-full text-left"
            >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>

            <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors text-sm w-full text-left">
                <User size={16} />
                <span>My Account</span>
            </button>

            <button className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors text-sm w-full text-left">
                <Settings size={16} />
                <span>Settings</span>
            </button>
        </div>
    );
};

export default UserProfile;
