"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { 
  MdPerson, MdEmail, MdPhone, MdLocationOn, 
  MdCake, MdLanguage, MdCode, MdExtension 
} from "react-icons/md";
import { FaLinkedin, FaGithub, FaGlobe, FaDribbble } from "react-icons/fa";

// Helper Card per coerenza con l'editor
const InfoCard = ({ title, icon, children, isVisible = true }: { title: string, icon: React.ReactNode, children: React.ReactNode, isVisible?: boolean }) => {
  if (!isVisible) return null;
  return (
    <div className="bg-white p-5 mb-5 border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="text-indigo-500">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
};

const PublicSidebar = ({ data }: { data: any }) => {
  // Recuperiamo le opzioni di visibilità dallo stato pubblico
  const visibility = useSelector((state: RootState) => state.showHidePublic);

  const renderPills = (items: string[] | undefined, colorClass: string) => {
    if (!items || items.length === 0 || (items.length === 1 && items[0] === "")) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-2">
      
      {/* Profilo & Immagine */}
      <div className="bg-white p-6 mb-5 border border-slate-100 rounded-xl shadow-sm text-center">
        {visibility.showImage && data.image ? (
          <div className="relative w-32 h-32 mx-auto mb-4 border-4 border-indigo-50 rounded-full overflow-hidden shadow-inner">
            <Image src={data.image} alt="Profile" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 mx-auto mb-4 bg-indigo-50 flex items-center justify-center rounded-full text-indigo-300">
            <MdPerson size={48} />
          </div>
        )}
        <h1 className="text-2xl font-bold text-slate-800 leading-tight">
          {data.name} {data.surname}
        </h1>
        <p className="text-indigo-600 font-medium mt-1">{data.desiredJob}</p>
      </div>

      {/* Bio / Sommario */}
      <InfoCard title="About Me" icon={<MdPerson />} isVisible={visibility.showBio && !!data.bio}>
        <div 
          className="text-slate-600 text-sm leading-relaxed quill-content" 
          dangerouslySetInnerHTML={{ __html: data.bio }} 
        />
      </InfoCard>

      {/* Contatti & Social */}
      <InfoCard title="Contacts" icon={<MdEmail />}>
        <div className="space-y-3">
          {data.email && (
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <MdEmail className="text-slate-400" />
              <a href={`mailto:${data.email}`} className="hover:text-indigo-600 transition-colors">{data.email}</a>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <MdPhone className="text-slate-400" />
              <span>{data.phone}</span>
            </div>
          )}
          {visibility.showAddress && data.address && (
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <MdLocationOn className="text-slate-400" />
              <span>{data.address}</span>
            </div>
          )}
          {visibility.showDateOfBirth && data.dateOfBirth && (
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <MdCake className="text-slate-400" />
              <span>{data.dateOfBirth}</span>
            </div>
          )}
        </div>

        {/* Social Icons Grid */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-50">
          {data.linkedin && <a href={data.linkedin} target="_blank" className="text-slate-400 hover:text-[#0077b5] transition-colors"><FaLinkedin size={20} /></a>}
          {data.github && <a href={data.github} target="_blank" className="text-slate-400 hover:text-[#333] transition-colors"><FaGithub size={20} /></a>}
          {data.website && <a href={data.website} target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors"><FaGlobe size={20} /></a>}
          {data.dribble && <a href={data.dribble} target="_blank" className="text-slate-400 hover:text-[#ea4c89] transition-colors"><FaDribbble size={20} /></a>}
        </div>
      </InfoCard>

      {/* Skills */}
      <InfoCard title="Hard Skills" icon={<MdCode />}>
        {renderPills(data.skillss, "bg-indigo-50 text-indigo-700 border-indigo-100")}
      </InfoCard>

      <InfoCard title="Soft Skills" icon={<MdExtension />}>
        {renderPills(data.softSkillss, "bg-emerald-50 text-emerald-700 border-emerald-100")}
      </InfoCard>

      <InfoCard title="Languages" icon={<MdLanguage />}>
        {renderPills(data.langSkillss, "bg-slate-50 text-slate-700 border-slate-200")}
      </InfoCard>

    </div>
  );
};

export default PublicSidebar;