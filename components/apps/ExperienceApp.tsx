import React, { useState } from 'react';
import { Folder, ChevronRight, FileText, HardDrive, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE } from '../../data';
import { Experience } from '../../types';

const ExperienceApp = () => {
  const [selectedJob, setSelectedJob] = useState<Experience | null>(EXPERIENCE[0]);

  return (
    <div className="flex h-full flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-slate-100 border-r border-gray-200 flex flex-col">
        <div className="p-2 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600">
                <HardDrive size={14} />
                <span>This PC &gt; Career (C:)</span>
            </div>
        </div>
        <div className="p-2 flex-1 overflow-y-auto">
           <div className="font-bold text-xs text-gray-500 uppercase px-2 mb-2 tracking-wider">Quick Access</div>
           {EXPERIENCE.map((job, index) => (
             <button
                key={index}
                onClick={() => setSelectedJob(job)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm mb-1 transition-colors ${
                    selectedJob === job ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'
                }`}
             >
                <Folder size={16} className={selectedJob === job ? 'fill-blue-500 text-blue-500' : 'fill-yellow-400 text-yellow-500'} />
                <span className="truncate text-left flex-1">{job.company}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-4 bg-white/50">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                <FileText size={14} /> <span>View Details</span>
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
            {selectedJob ? (
                <div className="max-w-3xl mx-auto animate-fade-in">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                            <span className="text-2xl font-bold">{selectedJob.company.charAt(0)}</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-light text-slate-800 mb-1">{selectedJob.role}</h1>
                            <h2 className="text-xl font-semibold text-blue-600">{selectedJob.company}</h2>
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{selectedJob.period}</span>
                                </div>
                                {selectedJob.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{selectedJob.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Responsibilities & Achievements</h3>
                        <ul className="space-y-3">
                            {selectedJob.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700">
                                    <ChevronRight size={16} className="text-blue-500 mt-1 shrink-0" />
                                    <span className="leading-relaxed">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                    Select a folder to view details
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceApp;
