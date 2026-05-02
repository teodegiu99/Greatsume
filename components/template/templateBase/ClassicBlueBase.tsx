"use client";
import { TemplateBaseProps } from "@/types/template";
import { IoMail, IoLocationSharp, IoCalendarClear } from "react-icons/io5";
import { BsFillTelephoneFill, BsGlobe } from "react-icons/bs";
import { FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa";

export const ClassicBlueBase: React.FC<TemplateBaseProps> = ({
    data,
    showHide,
}) => {
    return (
        /* Fondamenta del Layout: h-auto e overflow-visible per la visualizzazione corretta nel browser */
        <div 
            className="w-full h-auto min-h-full bg-white text-slate-800 font-sans overflow-visible" 
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
                    margin-bottom: 1.2rem;
                }
                
                .quill-content {
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    font-size: 13px;
                    line-height: 1.5;
                }
                
                .quill-content ul {
                    list-style-type: disc;
                    padding-left: 1.2rem;
                }

                .sidebar-title {
                    font-size: 14px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    padding-bottom: 4px;
                    margin-bottom: 12px;
                    margin-top: 24px;
                }
            `}</style>

            {/* Container principale con griglia: p-[1cm] simula il margine fisico */}
            <div className="grid grid-cols-3 h-auto min-h-full bg-white">
                
                {/* SIDEBAR SINISTRA (1/3) - Sfondo Blu Professionale */}
                <div className="col-span-1 bg-[#1c2863] text-white p-6 flex flex-col h-auto">
                    
                    {/* Immagine Profilo */}
                    {data?.image && showHide?.showImage && (
                        <div className="flex justify-center w-full mb-8 paginate-item">
                            <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-xl">
                                <img
                                    id="cvImage"
                                    className="w-full h-full object-cover"
                                    src={`${data?.image}`}
                                    alt="Profile"
                                />
                            </div>
                        </div>
                    )}

                    {/* Informazioni Personali */}
                    <div className="flex flex-col paginate-item">
                        <h3 className="sidebar-title">Info</h3>
                        <div className="space-y-3 text-xs">
                            {data?.address && showHide?.showAddress && (
                                <div className="flex items-start gap-2">
                                    <IoLocationSharp className="mt-0.5 text-blue-300 shrink-0" />
                                    <span>{data?.address}</span>
                                </div>
                            )}
                            {data?.dateOfBirth && showHide?.showDateOfBirth && (
                                <div className="flex items-center gap-2">
                                    <IoCalendarClear className="text-blue-300 shrink-0" />
                                    <span>{data?.dateOfBirth}</span>
                                </div>
                            )}
                            {data?.relocation && (
                                <div className="mt-2 p-2 bg-white/10 rounded italic border-l-2 border-blue-400">
                                    Relocation: {data?.relocation}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contatti e Social[cite: 1] */}
                    <div className="flex flex-col paginate-item">
                        <h3 className="sidebar-title">Contacts</h3>
                        <div className="space-y-3 text-xs">
                            {data?.email && (
                                <div className="flex items-center gap-2">
                                    <IoMail className="text-blue-300 shrink-0" />
                                    <span className="truncate">{data?.email}</span>
                                </div>
                            )}
                            {data?.phone && (
                                <div className="flex items-center gap-2">
                                    <BsFillTelephoneFill className="text-blue-300 shrink-0" />
                                    <span>{data?.phone}</span>
                                </div>
                            )}
                            {data?.linkedin && (
                                <div className="flex items-center gap-2">
                                    <FaLinkedin className="text-blue-300 shrink-0" />
                                    <span className="truncate">{data?.linkedin}</span>
                                </div>
                            )}
                            {data?.github && (
                                <div className="flex items-center gap-2">
                                    <FaGithub className="text-blue-300 shrink-0" />
                                    <span>GitHub</span>
                                </div>
                            )}
                            {data?.website && (
                                <div className="flex items-center gap-2">
                                    <BsGlobe className="text-blue-300 shrink-0" />
                                    <span className="truncate">{data?.website}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Tecnice[cite: 1] */}
                    {data?.skillss && data?.skillss.length > 0 && (
                        <div className="flex flex-col paginate-item">
                            <h3 className="sidebar-title">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {data?.skillss.map((skill, index) => (
                                    <span key={index} className="bg-white/10 px-2 py-1 rounded text-[10px] border border-white/5 uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lingue[cite: 1] */}
                    {data?.langSkillss && data?.langSkillss.length > 0 && (
                        <div className="flex flex-col paginate-item">
                            <h3 className="sidebar-title">Languages</h3>
                            <ul className="space-y-1 text-xs">
                                {data?.langSkillss.map((lang, index) => (
                                    <li key={index} className="flex justify-between border-b border-white/5 pb-1">
                                        <span>{lang}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* AREA PRINCIPALE (2/3)[cite: 1] */}
                <div className="col-span-2 p-10 bg-white flex flex-col h-auto">
                    
                    {/* Header: Nome e Ruolo[cite: 1] */}
                    <div className="mb-10 paginate-item">
                        {(data?.name || data?.surname) && (
                            <h1 className="text-4xl font-black text-[#1c2863] uppercase tracking-tight leading-none mb-2">
                                {data?.name} <span className="font-light">{data?.surname}</span>
                            </h1>
                        )}
                        {data?.desiredJob && (
                            <h2 className="text-lg font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">
                                {data?.desiredJob}
                            </h2>
                        )}
                        {data?.bio && showHide?.showBio && (
                            <div
                                className="quill-content text-slate-600 italic border-l-4 border-slate-200 pl-4 py-1"
                                dangerouslySetInnerHTML={{ __html: data.bio || "" }}
                            />
                        )}
                    </div>

                    {/* Esperienza Lavorativa[cite: 1] */}
                    {data?.experience && data?.experience.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1c2863] mb-4 flex items-center gap-4">
                                Experience
                                <div className="h-[1px] bg-slate-200 grow"></div>
                            </h2>
                            <div className="space-y-6">
                                {data?.experience.map((exp, index) => (
                                    <div key={index} className="paginate-item">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-sm text-slate-800 uppercase">
                                                {exp.title}
                                            </h3>
                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase">
                                                {exp.years}
                                            </span>
                                        </div>
                                        <div
                                            className="quill-content text-slate-500"
                                            dangerouslySetInnerHTML={{ __html: exp.exps || "" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Educazione[cite: 1] */}
                    {data?.education && data?.education.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1c2863] mb-4 flex items-center gap-4">
                                Education
                                <div className="h-[1px] bg-slate-200 grow"></div>
                            </h2>
                            <div className="space-y-6">
                                {data?.education.map((edu, index) => (
                                    <div key={index} className="paginate-item">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-sm text-slate-800 uppercase">
                                                {edu.etitle}
                                            </h3>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                                                {edu.eyears}
                                            </span>
                                        </div>
                                        <div
                                            className="quill-content text-slate-500"
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
    );
};