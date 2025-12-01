import React from 'react';
import { Download, Printer, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { PERSONAL_INFO } from '../../data';

const PDFViewerApp = () => {
  return (
    <div className="h-full flex flex-col bg-[#525659]">
      {/* Toolbar */}
      <div className="h-12 bg-[#323639] flex items-center justify-between px-4 shadow-md z-10">
         <div className="text-gray-300 font-medium text-sm truncate">CV_Jose_Artur_Kassala.pdf</div>
         <div className="flex items-center gap-4 text-gray-300">
            <button className="p-1 hover:bg-white/10 rounded"><ZoomOut size={18} /></button>
            <button className="p-1 hover:bg-white/10 rounded"><ZoomIn size={18} /></button>
            <div className="h-4 w-px bg-gray-500"></div>
            <button className="p-1 hover:bg-white/10 rounded"><Printer size={18} /></button>
            <button className="p-1 hover:bg-white/10 rounded"><Download size={18} /></button>
         </div>
      </div>

      {/* PDF Content Area (Simulated) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
         <div className="bg-white w-full max-w-[800px] min-h-[1100px] shadow-2xl p-8 md:p-12 text-slate-800">
            {/* Simple HTML Representation of the PDF Content */}
            <div className="border-b-2 border-slate-800 pb-6 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest">{PERSONAL_INFO.name}</h1>
                <p className="text-slate-500 mt-2">{PERSONAL_INFO.role}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <h3 className="font-bold text-slate-900 border-b border-gray-200 pb-1 mb-2">CONTACT</h3>
                        <p className="text-sm text-slate-600">{PERSONAL_INFO.phone}</p>
                        <p className="text-sm text-slate-600">{PERSONAL_INFO.email}</p>
                        <p className="text-sm text-slate-600">{PERSONAL_INFO.location}</p>
                    </div>
                    <div>
                         <h3 className="font-bold text-slate-900 border-b border-gray-200 pb-1 mb-2">EDUCATION</h3>
                         <div className="text-sm">
                             <p className="font-semibold">Jean Piaget de Benguela</p>
                             <p className="text-slate-500">Eng. Informática de Gestão</p>
                             <p className="text-xs text-slate-400">2018 - Present</p>
                         </div>
                    </div>
                     <div>
                         <h3 className="font-bold text-slate-900 border-b border-gray-200 pb-1 mb-2">SKILLS</h3>
                         <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                            <li>C# / .NET</li>
                            <li>PHP / Laravel</li>
                            <li>JavaScript / Vue.js</li>
                            <li>Flutter / Dart</li>
                            <li>SQL Server / MySQL</li>
                         </ul>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h3 className="font-bold text-slate-900 border-b border-gray-200 pb-1 mb-2">PROFILE</h3>
                        <p className="text-sm text-slate-600 leading-relaxed text-justify">
                            {PERSONAL_INFO.bio}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 border-b border-gray-200 pb-1 mb-2">EXPERIENCE</h3>
                        
                        <div className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-sm">SudoMake</h4>
                                <span className="text-xs text-slate-500">2019 - Present</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-700">Fundador e Gestor de Projectos</p>
                            <ul className="text-sm text-slate-600 mt-2 list-disc pl-4 space-y-1">
                                <li>Liderança de equipas multidisciplinares.</li>
                                <li>Desenvolvimento de sistemas de faturação.</li>
                                <li>Implementação de API de pagamentos.</li>
                            </ul>
                        </div>

                         <div className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h4 className="font-bold text-sm">Fasma, Lobito</h4>
                                <span className="text-xs text-slate-500">2023</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-700">Director Geral Adjunto & Programador</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Supervisão de operações estratégicas e desenvolvimento do sistema de gestão de RH.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PDFViewerApp;