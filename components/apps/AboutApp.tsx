import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../../data';
import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react';

const AboutApp = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDownload = () => {
        // Create a simple text file with the CV data
        const textContent = `
CURRICULUM VITAE
----------------
Name: ${PERSONAL_INFO.name}
Role: ${PERSONAL_INFO.role}
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
Bio: ${PERSONAL_INFO.bio}

Links:
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}
        `;
        
        const element = document.createElement("a");
        const file = new Blob([textContent], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "Curriculum_Vitae_Jose_Kassala.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setActiveMenu(null);
    };

    return (
        <div className="h-full flex flex-col bg-white text-slate-800 font-mono" onClick={() => setActiveMenu(null)}>
            {/* Menu Bar */}
            <div className="flex items-center gap-1 px-1 py-1 bg-white border-b border-gray-100 text-xs text-gray-700 relative select-none">
                <div className="relative" ref={menuRef}>
                    <span 
                        className={`hover:bg-gray-100 px-2 py-1 rounded cursor-pointer ${activeMenu === 'File' ? 'bg-blue-100' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'File' ? null : 'File'); }}
                    >
                        File
                    </span>
                    {activeMenu === 'File' && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-xl border border-gray-200 rounded-md py-1 z-50">
                            <button 
                                className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-xs"
                                onClick={handleDownload}
                            >
                                <Download size={14} /> Download CV (.txt)
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-xs text-gray-400" disabled>Print...</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-xs text-gray-400" disabled>Exit</button>
                        </div>
                    )}
                </div>
                <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Edit</span>
                <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Format</span>
                <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">View</span>
                <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">Help</span>
            </div>

            <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{PERSONAL_INFO.name}</h1>
                <p className="text-lg text-slate-500 mb-8">{PERSONAL_INFO.role}</p>

                <div className="prose prose-slate max-w-none text-sm md:text-base">
                    <p className="mb-6 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 py-2 pr-2 rounded-r">
                        {PERSONAL_INFO.bio}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        <div>
                            <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 border-b pb-2">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                        <Mail size={16} className="text-slate-600" />
                                    </div>
                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline hover:text-blue-600">{PERSONAL_INFO.email}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                        <Phone size={16} className="text-slate-600" />
                                    </div>
                                    <span>{PERSONAL_INFO.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                        <MapPin size={16} className="text-slate-600" />
                                    </div>
                                    <span>{PERSONAL_INFO.location}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 border-b pb-2">Social Profiles</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[#0077b5] flex items-center justify-center text-white">
                                        <Linkedin size={16} />
                                    </div>
                                    <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600">LinkedIn Profile</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[#333] flex items-center justify-center text-white">
                                        <Github size={16} />
                                    </div>
                                    <a href={`https://${PERSONAL_INFO.github}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600">GitHub Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-1 text-xs text-gray-400 flex justify-end gap-4">
                <span>Ln 1, Col 1</span>
                <span>UTF-8</span>
                <span>Windows (CRLF)</span>
            </div>
        </div>
    );
};

export default AboutApp;