"use client";

import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { TemplateBaseProps } from "@/types/template";

export const TechBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
  return (
    /* Fondamenta del Layout: h-auto e overflow-visible per la visualizzazione corretta nel browser */
    <div 
      className="w-full h-auto min-h-full bg-white text-[#1a202c] font-sans overflow-visible" 
      id="cv-ready"
    >
      <style jsx global>{`
        /* Ottimizzazione per Puppeteer e Stampa */
        @media print {
          html, body {
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            margin: 1cm; /* Margine fisico richiesto */
            size: A4;
            background-color: white !important;
          }
          #cv-ready {
            padding: 0 !important;
            height: auto !important;
            background-color: white !important;
          }
          /* Prevenzione tagli a metà dei blocchi */
          .paginate-item {
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                        display: block; 
                        position: relative;
                        background-color: white !important;
                    }
        }

        /* Stili per visualizzazione Web */
        .paginate-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
        }
        
        .quill-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          font-size: 13px;
          line-height: 1.6;
        }
        
        .quill-content ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin-top: 0.5rem;
        }
      `}</style>

      {/* Container con padding di 1cm che simula il margine fisico */}
      <div className="p-[1cm] flex flex-col h-auto bg-white">
        
        {/* HEADER SECTION[cite: 1] */}
        <div className="flex justify-between items-start mb-8 paginate-item">
          <div className="max-w-[70%]">
            <h1 className="text-4xl font-extrabold text-[#2d3748] tracking-tight">
              {data?.name} <span className="text-blue-600">{data?.surname}</span>
            </h1>
            {data?.desiredJob && (
              <p className="text-xl font-medium text-gray-600 mt-1 uppercase tracking-tighter italic">
                {data?.desiredJob}
              </p>
            )}
            
            {/* Address & DOB[cite: 1] */}
            <div className="flex gap-x-4 mt-2 text-sm text-gray-500 font-medium">
                {data?.address && showHide?.showAddress && <span>{data?.address}</span>}
                {data?.dateOfBirth && showHide?.showDateOfBirth && <span>• {data?.dateOfBirth}</span>}
            </div>

            {data?.bio && showHide?.showBio && (
              <div 
                className="quill-content mt-4 border-l-4 border-blue-100 pl-4 italic text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.bio || "" }} 
              />
            )}
          </div>
          
          {/* Social & Contact Pills[cite: 1] */}
          <div className="flex flex-col items-end gap-y-2">
            {data?.email && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100 text-xs font-bold font-mono">
                {data?.email}
              </span>
            )}
            {data?.phone && (
              <span className="text-gray-600 text-xs font-bold font-mono">{data?.phone}</span>
            )}
            <div className="flex gap-x-3 mt-2 text-xl text-gray-700">
              {data?.github && <a href={data?.github} target="_blank" className="hover:text-blue-600 transition-colors"><FaGithub /></a>}
              {data?.linkedin && <a href={data?.linkedin} target="_blank" className="hover:text-blue-600 transition-colors"><FaLinkedin /></a>}
              {data?.website && <a href={data?.website} target="_blank" className="hover:text-blue-600 transition-colors"><FaExternalLinkAlt className="text-lg" /></a>}
            </div>
          </div>
        </div>

        {/* RELOCATION & RAL (Se presenti)[cite: 1] */}
        {(data?.relocation || data?.ral) && (
            <div className="flex gap-x-6 mb-8 p-3 bg-neutral-50 rounded-xl paginate-item border border-neutral-100">
                {data?.relocation && (
                    <p className="text-xs">
                        <span className="font-bold uppercase tracking-widest text-blue-600 mr-2">Relocation:</span>
                        {data?.relocation}
                    </p>
                )}
                {data?.ral && (
                    <p className="text-xs">
                        <span className="font-bold uppercase tracking-widest text-blue-600 mr-2">Expected RAL:</span>
                        {data?.ral}
                    </p>
                )}
            </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* SIDEBAR SINISTRA - Skills & Languages[cite: 1] */}
          <div className="col-span-1 space-y-8">
            {data?.skillss && data?.skillss.length > 0 && (
              <div className="paginate-item">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 border-b-2 border-blue-50 pb-1">Technical Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {data?.skillss.map((skill, i) => (
                    <span key={i} className="bg-white border border-gray-200 px-2 py-1 rounded-md text-[10px] font-bold font-mono shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data?.softSkillss && data?.softSkillss.length > 0 && (
              <div className="paginate-item">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 border-b-2 border-blue-50 pb-1">Core Competencies</h2>
                <ul className="text-xs space-y-2 text-gray-700 font-medium">
                  {data?.softSkillss.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">▹</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data?.langSkillss && data?.langSkillss.length > 0 && (
              <div className="paginate-item">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 border-b-2 border-blue-50 pb-1">Languages</h2>
                <div className="space-y-2">
                  {data?.langSkillss.map((lang, i) => (
                    <div key={i} className="text-xs font-bold text-gray-600 flex justify-between uppercase">
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* MAIN CONTENT - Experience & Education[cite: 1] */}
          <div className="col-span-2 space-y-8">
            {data?.experience && data?.experience.length > 0 && (
              <div>
                <h2 className="paginate-item text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6 border-b-2 border-blue-50 pb-1">Professional Experience</h2>
                <div className="space-y-8">
                  {data?.experience.map((exp, i) => (
                    <div key={i} className="paginate-item border-l-2 border-blue-50 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7.5px] top-0 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base text-[#2d3748] leading-tight uppercase tracking-tight">{exp.title}</h3>
                        <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded uppercase">{exp.years}</span>
                      </div>
                      <div 
                        className="quill-content text-gray-600"
                        dangerouslySetInnerHTML={{ __html: exp.exps || "" }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data?.education && data?.education.length > 0 && (
              <div className="pt-4">
                <h2 className="paginate-item text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6 border-b-2 border-blue-50 pb-1">Educational Background</h2>
                <div className="space-y-6">
                  {data?.education.map((edu, i) => (
                    <div key={i} className="paginate-item">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-[#2d3748] uppercase tracking-tight">{edu.etitle}</h3>
                        <span className="text-[10px] font-bold text-gray-400">{edu.eyears}</span>
                      </div>
                      <div 
                        className="quill-content text-gray-500 italic"
                        dangerouslySetInnerHTML={{ __html: edu.edu || "" }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};