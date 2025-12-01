import React, { useState } from 'react';
import { User, Briefcase, Code, GraduationCap, Terminal, Monitor, FileText, Trash2, HardDrive } from 'lucide-react';

import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';

// Apps
import AboutApp from './components/apps/AboutApp';
import ExperienceApp from './components/apps/ExperienceApp';
import ProjectsApp from './components/apps/ProjectsApp';
import SkillsApp from './components/apps/SkillsApp';
import ExplorerApp from './components/apps/ExplorerApp';
import PDFViewerApp from './components/apps/PDFViewerApp';

// Types
import { WindowApp } from './types';

const App = () => {
  // Desktop wallpaper
  const WALLPAPER_URL = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80";

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeZIndex, setActiveZIndex] = useState(10);
  
  const [windows, setWindows] = useState<WindowApp[]>([
    { id: 'about', title: 'About Me', icon: <User size={20} />, component: <AboutApp />, isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10, width: '600px', height: '500px' },
    { id: 'explorer', title: 'File Explorer', icon: <HardDrive size={20} />, component: <ExplorerApp />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'experience', title: 'Experience (Legacy)', icon: <Briefcase size={20} />, component: <ExperienceApp />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'projects', title: 'Projects', icon: <Code size={20} />, component: <ProjectsApp />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'skills', title: 'Skills & Edu', icon: <GraduationCap size={20} />, component: <SkillsApp />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    { id: 'cv_pdf', title: 'Curriculum Vitae.pdf', icon: <FileText size={20} />, component: <PDFViewerApp />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, width: '900px', height: '800px' },
    { id: 'terminal', title: 'Terminal', icon: <Terminal size={20} />, component: <div className="p-4 bg-black text-green-400 font-mono h-full">System Ready...<br/>{'>'} User: José Artur Kassala loaded.<br/>{'>'} Status: Hired? Pending...</div>, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  ]);

  const toggleStartMenu = () => setStartMenuOpen(!startMenuOpen);

  const focusWindow = (id: string) => {
    setActiveZIndex(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: activeZIndex + 1, isMinimized: false } : w
    ));
    setStartMenuOpen(false);
  };

  const openWindow = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (win) {
      if (win.isOpen && !win.isMinimized) {
        focusWindow(id);
      } else {
        setActiveZIndex(prev => prev + 1);
        setWindows(prev => prev.map(w => 
          w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: activeZIndex + 1 } : w
        ));
      }
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false, isMaximized: false } : w
    ));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
    focusWindow(id);
  };

  const handleTaskbarClick = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (win?.isOpen && !win.isMinimized && win.zIndex === Math.max(...windows.map(w => w.zIndex))) {
      minimizeWindow(id);
    } else {
      openWindow(id);
    }
  };

  // Explicit Desktop Icons Definition
  const desktopIcons = [
    { id: 'explorer', label: 'This PC', icon: <Monitor size={32} className="text-blue-500 fill-blue-100" /> },
    { id: 'cv_pdf', label: 'Curriculum Vitae', icon: <div className="relative"><FileText size={32} className="text-red-500 fill-white" /><span className="absolute bottom-0 right-0 bg-red-600 text-white text-[8px] font-bold px-0.5 rounded">PDF</span></div> },
    { id: 'recycle', label: 'Recycle Bin', icon: <Trash2 size={32} className="text-gray-400 fill-gray-100" />, action: () => alert('Recycle Bin is empty') },
    { id: 'experience', label: 'Career History', icon: <Briefcase size={32} className="text-yellow-600 fill-yellow-100" /> },
    { id: 'projects', label: 'My Projects', icon: <Code size={32} className="text-purple-600 fill-purple-100" /> },
  ];

  // Start Menu Items (Subset)
  const startMenuApps = windows.filter(w => w.id !== 'cv_pdf').map(w => ({
    id: w.id,
    title: w.title,
    icon: w.icon,
    onClick: () => openWindow(w.id)
  }));

  // Taskbar Items (Only open ones or pinned)
  const taskbarApps = windows.map(w => ({
    id: w.id,
    title: w.title,
    icon: w.icon,
    isOpen: w.isOpen,
    isActive: !w.isMinimized && w.zIndex === Math.max(...windows.filter(win => win.isOpen && !win.isMinimized).map(win => win.zIndex)),
    onClick: () => handleTaskbarClick(w.id)
  }));

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative select-none"
      style={{ backgroundImage: `url(${WALLPAPER_URL})` }}
      onClick={() => setStartMenuOpen(false)}
    >
      {/* Desktop Icons Layer - Z-Index 0 */}
      <div className="absolute top-0 left-0 w-full h-full z-0 p-4 grid grid-flow-col grid-rows-6 gap-4 content-start justify-start w-fit">
        {desktopIcons.map((icon, idx) => (
            <button
                key={idx}
                onDoubleClick={() => icon.action ? icon.action() : openWindow(icon.id)}
                className="flex flex-col items-center gap-1 w-24 p-2 rounded hover:bg-white/10 border border-transparent hover:border-white/20 transition group focus:bg-white/20 focus:border-white/30 outline-none"
            >
                <div className="filter drop-shadow-lg group-hover:scale-105 transition-transform duration-200">
                    {icon.icon}
                </div>
                <span className="text-white text-xs font-medium text-center shadow-black drop-shadow-md line-clamp-2 leading-tight">
                    {icon.label}
                </span>
            </button>
        ))}
      </div>

      {/* Windows Layer - Z-Index 10+ */}
      {/* Pointer events none on container, auto on windows to let clicks pass through to desktop */}
      <div className="absolute inset-0 pointer-events-none z-10">
            {windows.map(win => (
                <div key={win.id} className="pointer-events-auto">
                    <Window
                        {...win}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onMaximize={maximizeWindow}
                        onFocus={focusWindow}
                    >
                        {win.component}
                    </Window>
                </div>
            ))}
      </div>

      {/* Start Menu - Z-Index 50 */}
      <div className="relative z-50">
        <StartMenu 
            isOpen={startMenuOpen} 
            onClose={() => setStartMenuOpen(false)}
            apps={startMenuApps}
        />
      </div>

      {/* Taskbar - Z-Index 100 */}
      <div className="relative z-[100]">
          <Taskbar 
            onToggleStart={toggleStartMenu}
            apps={taskbarApps}
          />
      </div>
    </div>
  );
};

export default App;