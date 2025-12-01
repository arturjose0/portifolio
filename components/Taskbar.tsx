import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, ChevronUp } from 'lucide-react';

interface TaskbarProps {
  onToggleStart: () => void;
  apps: { id: string; title: string; icon: React.ReactNode; isOpen: boolean; isActive: boolean; onClick: () => void }[];
}

const Taskbar: React.FC<TaskbarProps> = ({ onToggleStart, apps }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 taskbar-glass border-t border-white/20 flex items-center justify-between px-2 md:px-4 z-[10000]">
      {/* Widget Space (Empty on left to balance center) */}
      <div className="hidden md:flex w-32 justify-start items-center opacity-0 hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-600">Widgets</span>
      </div>

      {/* Center Apps */}
      <div className="flex items-center gap-1 md:gap-2">
        <button 
            onClick={(e) => {
                e.stopPropagation(); // Prevents click from bubbling to App background
                onToggleStart();
            }}
            className="p-2 rounded hover:bg-white/50 transition-all duration-200 active:scale-95 group relative"
        >
            {/* Windows Logo Simulation */}
            <div className="w-6 h-6 grid grid-cols-2 gap-[2px]">
                <div className="bg-[#00a4ef] rounded-tl-[2px]"></div>
                <div className="bg-[#00a4ef] rounded-tr-[2px]"></div>
                <div className="bg-[#00a4ef] rounded-bl-[2px]"></div>
                <div className="bg-[#00a4ef] rounded-br-[2px]"></div>
            </div>
        </button>

        {apps.map((app) => (
          <button
            key={app.id}
            onClick={(e) => {
                e.stopPropagation();
                app.onClick();
            }}
            className={`p-2 rounded hover:bg-white/50 transition-all duration-200 relative group ${
                app.isActive && app.isOpen ? 'bg-white/40' : ''
            }`}
          >
            <div className={`transition-transform duration-200 ${app.isActive && app.isOpen ? '-translate-y-1' : ''} text-blue-600`}>
                <div className="w-6 h-6 flex items-center justify-center">
                    {app.icon}
                </div>
            </div>
            {app.isOpen && (
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1 rounded-full transition-all duration-300 ${app.isActive ? 'w-3 bg-blue-500' : 'bg-gray-400'}`}></div>
            )}
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.title}
            </div>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 md:gap-4 px-2">
        <div className="hidden md:flex items-center gap-1 hover:bg-white/50 p-1.5 rounded transition">
            <ChevronUp size={14} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2 hover:bg-white/50 p-1.5 rounded transition cursor-default">
            <Wifi size={16} className="text-gray-700" />
            <Volume2 size={16} className="text-gray-700" />
            <Battery size={16} className="text-gray-700" />
        </div>
        <div className="text-right flex flex-col justify-center px-2 hover:bg-white/50 rounded transition cursor-default h-full">
            <span className="text-xs font-medium text-gray-700 leading-none mb-0.5">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-[10px] text-gray-600 leading-none">
                {time.toLocaleDateString()}
            </span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;