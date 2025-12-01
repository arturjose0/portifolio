import React, { useState } from 'react';
import { 
    ArrowLeft, ArrowRight, ArrowUp, RefreshCw, Home, Monitor, 
    Download, FileText, Music, Video, Image as ImageIcon, 
    HardDrive, Folder, File, Disc, Search, Star, MoreHorizontal 
} from 'lucide-react';
import { FILE_SYSTEM } from '../../data';
import { FileItem } from '../../types';

const ExplorerApp = () => {
    const [currentPath, setCurrentPath] = useState<string>('This PC');
    const [history, setHistory] = useState<string[]>(['This PC']);
    const [historyIndex, setHistoryIndex] = useState(0);

    const navigate = (path: string) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(path);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(path);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(history[historyIndex + 1]);
        }
    };

    const goUp = () => {
        if (currentPath === 'This PC') return;
        // Simple logic for now, returns to This PC if deep
        navigate('This PC');
    };

    const handleDownload = (file: FileItem) => {
        // Mock download
        const element = document.createElement("a");
        const fileContent = file.content || "Mock content for " + file.name;
        const fileBlob = new Blob([fileContent], { type: "text/plain" });
        element.href = URL.createObjectURL(fileBlob);
        element.download = file.name;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const getFiles = () => {
        if (currentPath === 'This PC') return []; // Special render for This PC
        return FILE_SYSTEM[currentPath] || [];
    };

    const getIcon = (type: string) => {
        switch(type) {
            case 'folder': return <Folder className="text-yellow-400 fill-yellow-400" size={48} />;
            case 'pdf': return <FileText className="text-red-500" size={40} />;
            case 'image': return <ImageIcon className="text-purple-500" size={40} />;
            case 'video': return <Video className="text-blue-500" size={40} />;
            case 'audio': return <Music className="text-pink-500" size={40} />;
            default: return <File className="text-gray-400" size={40} />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f0f3f9] select-none text-sm">
            {/* Ribbon / Top Bar */}
            <div className="bg-[#f3f3f3] border-b border-[#e5e5e5] flex flex-col pt-2 pb-2 px-2 gap-2">
                
                {/* Navigation Bar */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center text-gray-500 gap-1">
                        <button onClick={goBack} disabled={historyIndex === 0} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30">
                            <ArrowLeft size={16} />
                        </button>
                        <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30">
                            <ArrowRight size={16} />
                        </button>
                        <button onClick={goUp} className="p-1 hover:bg-gray-200 rounded">
                            <ArrowUp size={16} />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                            <RefreshCw size={14} />
                        </button>
                    </div>

                    {/* Address Bar */}
                    <div className="flex-1 bg-white border border-gray-300 rounded flex items-center px-2 py-1 gap-2 shadow-sm">
                        <Monitor size={14} className="text-gray-500" />
                        <span className="flex-1 text-gray-700 leading-none pt-0.5">{currentPath}</span>
                        <MoreHorizontal size={14} className="text-gray-400" />
                    </div>

                    {/* Search Bar */}
                    <div className="w-48 bg-white border border-gray-300 rounded flex items-center px-2 py-1 gap-2 shadow-sm">
                        <Search size={14} className="text-gray-400" />
                        <span className="text-gray-400">Search {currentPath}</span>
                    </div>
                </div>

                {/* Toolbar Mockup */}
                <div className="flex items-center gap-4 px-2 border-t border-gray-200 pt-1">
                     <span className="text-xs text-gray-500 font-medium hover:bg-gray-200 px-2 py-1 rounded cursor-pointer flex items-center gap-1">
                        <span className="text-blue-600 font-bold text-lg">+</span> New
                     </span>
                     <div className="h-4 w-px bg-gray-300"></div>
                     <span className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"><FileText size={14}/></span>
                     <span className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"><Folder size={14}/></span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 md:w-56 bg-white border-r border-[#e5e5e5] overflow-y-auto py-2">
                    <div className="px-2 mb-2">
                        <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <Star size={12} /> Quick Access
                        </div>
                        {['Desktop', 'Downloads', 'Documents', 'Pictures'].map(item => (
                            <button 
                                key={item} 
                                onClick={() => navigate(item)}
                                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-left transition-colors ${currentPath === item ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                {item === 'Desktop' ? <Monitor size={16} className="text-blue-500"/> :
                                 item === 'Downloads' ? <Download size={16} className="text-green-500"/> :
                                 item === 'Documents' ? <FileText size={16} className="text-gray-500"/> :
                                 <ImageIcon size={16} className="text-purple-500"/>
                                }
                                {item}
                            </button>
                        ))}
                    </div>
                    
                    <div className="px-2 mt-4">
                        <div className="flex items-center gap-2 px-2 py-1 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <Monitor size={12} /> This PC
                        </div>
                        <button 
                            onClick={() => navigate('This PC')}
                            className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-left transition-colors ${currentPath === 'This PC' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            <HardDrive size={16} className="text-gray-600" />
                            Local Disk (C:)
                        </button>
                         {['Music', 'Videos'].map(item => (
                            <button 
                                key={item} 
                                onClick={() => navigate(item)}
                                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-left transition-colors ${currentPath === item ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                {item === 'Music' ? <Music size={16} className="text-pink-500"/> : <Video size={16} className="text-blue-500"/>}
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white overflow-y-auto p-4">
                    {currentPath === 'This PC' ? (
                        <div>
                            <h3 className="text-gray-500 font-bold mb-3 border-b pb-1">Folders</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                                {['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos'].map(folder => (
                                    <button 
                                        key={folder}
                                        onClick={() => navigate(folder)}
                                        className="flex flex-col items-center gap-2 p-2 hover:bg-blue-50 hover:border-blue-100 border border-transparent rounded transition group"
                                    >
                                        <Folder className="text-yellow-400 fill-yellow-400 drop-shadow-sm" size={54} />
                                        <span className="text-center text-gray-700 group-hover:text-blue-700">{folder}</span>
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-gray-500 font-bold mb-3 border-b pb-1">Devices and drives</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-100 border border-gray-200 rounded cursor-default">
                                    <HardDrive size={42} className="text-gray-600" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-800">Local Disk (C:)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 w-[75%] h-full"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>75 GB free of 500 GB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                             <h3 className="text-gray-500 font-bold mb-4">{currentPath}</h3>
                             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {getFiles().map((file, idx) => (
                                    <button 
                                        key={idx}
                                        onDoubleClick={() => handleDownload(file)}
                                        className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 hover:border-blue-100 border border-transparent rounded transition group text-center"
                                        title={file.name}
                                    >
                                        <div className="relative">
                                             {getIcon(file.type)}
                                             {/* Mini Badge for specific types */}
                                             {file.type === 'file' && <div className="absolute -bottom-1 -right-1 bg-white rounded shadow text-[8px] px-1 uppercase border border-gray-200">DOC</div>}
                                        </div>
                                        <span className="text-gray-700 text-xs break-all line-clamp-2 group-hover:text-blue-700">{file.name}</span>
                                        <span className="text-gray-400 text-[10px]">{file.size}</span>
                                    </button>
                                ))}
                                {getFiles().length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-20">
                                        <Folder size={64} className="text-gray-200 mb-2"/>
                                        <p>This folder is empty.</p>
                                    </div>
                                )}
                             </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Footer */}
            <div className="h-6 bg-white border-t border-gray-200 flex items-center px-4 text-xs text-gray-500 gap-4">
                <span>{currentPath === 'This PC' ? '6 items' : `${getFiles().length} items`}</span>
                <span className="border-l border-gray-300 pl-4"></span>
            </div>
        </div>
    );
};

export default ExplorerApp;