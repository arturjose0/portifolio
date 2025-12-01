import React from 'react';
import { Power, User, Search, Settings } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  apps: { id: string; title: string; icon: React.ReactNode; onClick: () => void }[];
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, apps }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] h-[500px] glass rounded-xl shadow-2xl flex flex-col overflow-hidden z-[9999] transition-all duration-200 animate-slide-up border border-white/40">
      
      {/* Search Bar */}
      <div className="p-6 pb-2">
        <div className="bg-white/70 flex items-center gap-3 px-4 py-2.5 rounded-full border border-gray-200 shadow-sm">
          <Search size={18} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search for apps, settings, and documents" 
            className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Pinned Apps Grid */}
      <div className="flex-1 p-6 pt-2 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold text-gray-600 ml-2">Pinned</h3>
          <button className="text-xs bg-white/50 px-2 py-1 rounded shadow-sm hover:bg-white/80 transition">All apps &gt;</button>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                app.onClick();
                onClose();
              }}
              className="flex flex-col items-center gap-2 p-2 hover:bg-white/40 rounded-lg transition duration-200 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                {app.icon}
              </div>
              <span className="text-xs text-gray-700 font-medium text-center line-clamp-1">{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Section (Static for aesthetics) */}
      <div className="px-6 pb-4">
        <h3 className="text-xs font-bold text-gray-600 mb-3 ml-2">Recommended</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 p-2 hover:bg-white/40 rounded-lg transition cursor-default">
            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-600">
               <span className="font-bold text-xs">PDF</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-800">CV_Jose_Kassala.pdf</span>
              <span className="text-xs text-gray-500">Recently added</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="h-16 bg-black/5 border-t border-gray-200/50 flex items-center justify-between px-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 hover:bg-white/30 p-2 rounded-lg cursor-pointer transition">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
            <User size={16} />
          </div>
          <span className="text-sm font-semibold text-gray-700">{PERSONAL_INFO.name}</span>
        </div>
        <button className="p-2 hover:bg-red-500 hover:text-white rounded-lg text-gray-600 transition duration-200">
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
