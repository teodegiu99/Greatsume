"use client";

import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { TemplateBaseProps } from "@/types/template";

export const TechBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
  return (
    <div className="h-full w-full bg-[#fafafa] text-[#1a202c] p-8 font-sans" id="cv-ready">
      <div className="flex justify-between items-start mb-10">
        <div className="max-w-[70%]">
          <h1 className="text-4xl font-extrabold text-[#2d3748] tracking-tight">
            {data?.name} <span className="text-blue-600">{data?.surname}</span>
          </h1>
          <p className="text-xl font-medium text-gray-600 mt-2">{data?.desiredJob}</p>
<div 
  className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
  dangerouslySetInnerHTML={{ __html: data?.bio || "" }} 
/>        </div>
        
        <div className="flex flex-col items-end gap-y-2 text-sm font-medium">
          {data?.email && <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">{data?.email}</span>}
          <div className="flex gap-x-3 mt-2 text-xl text-gray-700">
            {data?.github && <a href={data?.github} target="_blank"><FaGithub /></a>}
            {data?.linkedin && <a href={data?.linkedin} target="_blank"><FaLinkedin /></a>}
            {data?.website && <a href={data?.website} target="_blank"><FaExternalLinkAlt className="text-lg" /></a>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Sidebar sinistra - Skills */}
        <div className="col-span-1 space-y-8">
          <div className="paginate-item">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Technical Stack</h2>
            <div className="flex flex-wrap gap-2">
              {data?.skillss?.map((skill, i) => (
                <span key={i} className="bg-white border border-gray-200 px-2 py-1 rounded text-xs font-mono shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="paginate-item">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Soft Skills</h2>
            <ul className="text-sm space-y-1 text-gray-700">
              {data?.softSkillss?.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </div>

          <div className="paginate-item">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Languages</h2>
            <div className="space-y-2">
              {data?.langSkillss?.map((lang, i) => (
                <div key={i} className="text-sm font-medium flex justify-between">
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Experience & Education */}
        <div className="col-span-2 space-y-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Professional Experience</h2>
            <div className="space-y-6">
              {data?.experience?.map((exp, i) => (
                <div key={i} className="paginate-item border-l-2 border-gray-200 pl-4 relative">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1"></div>
                  <h3 className="font-bold text-lg leading-none">{exp.title}</h3>
                  <p className="text-xs font-bold text-gray-500 mt-1 mb-2 uppercase">{exp.years}</p>
                  <div 
  className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
  dangerouslySetInnerHTML={{ __html: exp.exps || "" }} 
/>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Education</h2>
            <div className="space-y-4">
              {data?.education?.map((edu, i) => (
                <div key={i} className="paginate-item">
                  <h3 className="font-bold text-sm uppercase">{edu.etitle}</h3>
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <div 
  className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
  dangerouslySetInnerHTML={{ __html: edu.edu || "" }} 
/>
                    <span>{edu.eyears}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
