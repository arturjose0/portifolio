import React from 'react';
import { SKILLS, EDUCATION } from '../../data';
import { Cpu, BookOpen, Layers, Code, Database, Monitor, GraduationCap } from 'lucide-react';

const SkillsApp = () => {
    return (
        <div className="h-full flex flex-col bg-[#f0f3f9]">
            {/* Header */}
            <div className="bg-white px-8 py-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-800">System Information</h1>
                <p className="text-slate-500 text-sm">Skills & Education Overview</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    
                    {/* Skills Section */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <Cpu size={20} className="text-blue-500" /> Technical Specifications
                        </h2>
                        
                        <div className="grid gap-4">
                            {SKILLS.map((skillGroup, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition">
                                    <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                        {skillGroup.category.includes('Web') ? <GlobeIcon /> :
                                         skillGroup.category.includes('Mobile') ? <PhoneIcon /> :
                                         skillGroup.category.includes('Data') ? <DatabaseIcon /> :
                                         <CodeIcon />}
                                        {skillGroup.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.skills.map((skill, sIdx) => (
                                            <span 
                                                key={sIdx}
                                                className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                            <BookOpen size={20} className="text-emerald-500" /> Academic Background
                        </h2>

                        <div className="relative border-l-2 border-emerald-100 ml-3 space-y-8 py-2">
                            {EDUCATION.map((edu, idx) => (
                                <div key={idx} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#f0f3f9]"></div>
                                    <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                                                <GraduationCap size={20} />
                                            </div>
                                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                {edu.year}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 leading-tight mb-1">{edu.degree}</h3>
                                        <p className="text-sm text-slate-500">{edu.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Languages Box */}
                        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Monitor size={20} /> Languages
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Portuguese</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </div>
                                </div>
                                <div className="w-full bg-white/20 h-1 rounded-full">
                                    <div className="w-full h-full bg-white rounded-full"></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-medium">English</span>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                        <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                    </div>
                                </div>
                                <div className="w-full bg-white/20 h-1 rounded-full">
                                    <div className="w-[60%] h-full bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Simple Icon Wrappers
const GlobeIcon = () => <Layers size={14} className="text-blue-500" />;
const PhoneIcon = () => <Monitor size={14} className="text-purple-500" />;
const DatabaseIcon = () => <Database size={14} className="text-orange-500" />;
const CodeIcon = () => <Code size={14} className="text-gray-500" />;

export default SkillsApp;
