import React, { useState } from 'react';
import { PROJECTS } from '../../data';
import { Folder, Globe, Database, Smartphone, Layout, LayoutGrid, List } from 'lucide-react';

const ProjectsApp = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState('All');
    
    const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

    const filteredProjects = filter === 'All' 
        ? PROJECTS 
        : PROJECTS.filter(p => p.category === filter);

    const getIcon = (cat: string) => {
        if (cat.includes('Mobile')) return <Smartphone size={24} className="text-purple-500" />;
        if (cat.includes('Web')) return <Globe size={24} className="text-blue-500" />;
        if (cat.includes('Desktop')) return <Layout size={24} className="text-teal-500" />;
        return <Database size={24} className="text-orange-500" />;
    };

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header / Filter Bar */}
            <div className="bg-white p-4 shadow-sm z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                filter === cat 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex bg-slate-100 rounded-lg p-1">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-3'}`}>
                    {filteredProjects.map((project, idx) => (
                        <div 
                            key={idx} 
                            className={`bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 group ${
                                viewMode === 'list' ? 'flex items-center p-4 gap-4' : 'flex flex-col p-6'
                            }`}
                        >
                            <div className={`rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors ${
                                viewMode === 'list' ? 'w-12 h-12' : 'w-16 h-16 mb-4'
                            }`}>
                                {getIcon(project.category)}
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{project.description}</p>
                            </div>
                            
                            <div className="mt-auto pt-4 md:pt-0">
                                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredProjects.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Folder size={48} className="mb-2 opacity-50" />
                        <p>No projects found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsApp;
