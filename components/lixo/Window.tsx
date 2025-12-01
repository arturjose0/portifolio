import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Maximize2, GripHorizontal } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  width?: string | number;
  height?: string | number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  width = 800,
  height = 600,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  const [isMounting, setIsMounting] = useState(false);
  
  // State for Dragging
  const [position, setPosition] = useState({ x: 100, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // State for Resizing
  const [size, setSize] = useState({ width: typeof width === 'number' ? width : 800, height: typeof height === 'number' ? height : 600 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (isOpen) {
      // Randomize initial position slightly so windows don't stack perfectly
      const randomOffset = Math.floor(Math.random() * 50);
      setPosition({ x: 50 + randomOffset, y: 50 + randomOffset });
      setTimeout(() => setIsMounting(true), 10);
    } else {
      setIsMounting(false);
    }
  }, [isOpen]);

  // --- Drag Logic ---
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return; // Cannot drag when maximized
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
    };
    onFocus(id);
  };

  // --- Resize Logic ---
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    resizeStartSize.current = { width: size.width, height: size.height };
    onFocus(id);
  };

  // --- Global Mouse Move/Up Listener ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStartPos.current.x,
                y: e.clientY - dragStartPos.current.y
            });
        }
        if (isResizing) {
            const deltaX = e.clientX - resizeStartPos.current.x;
            const deltaY = e.clientY - resizeStartPos.current.y;
            setSize({
                width: Math.max(300, resizeStartSize.current.width + deltaX),
                height: Math.max(200, resizeStartSize.current.height + deltaY)
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    if (isDragging || isResizing) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);


  if (!isOpen && !isMounting) return null;

  const baseClasses = "absolute flex flex-col shadow-2xl rounded-lg overflow-hidden border border-gray-200/50 glass transition-opacity duration-200";
  
  // Logic to switch between Maximized style and Windowed style
  const style = isMaximized 
    ? { 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: '48px', // Taskbar height
        width: '100%', 
        height: 'calc(100% - 48px)', 
        borderRadius: 0,
        zIndex,
        display: isMinimized ? 'none' : 'flex'
      }
    : { 
        top: `${position.y}px`, 
        left: `${position.x}px`, 
        width: `${size.width}px`, 
        height: `${size.height}px`,
        maxWidth: '100vw',
        maxHeight: 'calc(100vh - 48px)',
        zIndex,
        display: isMinimized ? 'none' : 'flex',
        // Smooth transition only for opacity/transform, NOT top/left/width/height (causes lag when dragging)
      };

  const animationClasses = isMinimized
    ? "opacity-0 scale-75 translate-y-[100%]" // Fly to taskbar
    : isOpen && isMounting
    ? "opacity-100 scale-100 translate-y-0"
    : "opacity-0 scale-95 translate-y-4";

  return (
    <div
      className={`${baseClasses} ${animationClasses}`}
      style={style as React.CSSProperties}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div 
        className="h-9 bg-white/50 border-b border-gray-200/50 flex items-center justify-between px-3 select-none backdrop-blur-md cursor-default"
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => onMaximize(id)}
      >
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 pointer-events-none">
          <span className="w-4 h-4 text-blue-600 flex items-center justify-center">{icon}</span>
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="p-2 hover:bg-gray-200 rounded-md text-slate-600 transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            className="p-2 hover:bg-gray-200 rounded-md text-slate-600 transition-colors"
          >
            {isMaximized ? <Maximize2 size={12} /> : <Square size={12} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="p-2 hover:bg-red-500 hover:text-white rounded-md text-slate-600 transition-colors group"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white/80 relative" onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}>
        {children}
      </div>

      {/* Resize Handle (Bottom Right) */}
      {!isMaximized && (
        <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-center justify-center opacity-0 hover:opacity-100"
            onMouseDown={handleResizeMouseDown}
        >
            <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
        </div>
      )}
    </div>
  );
};

export default Window;