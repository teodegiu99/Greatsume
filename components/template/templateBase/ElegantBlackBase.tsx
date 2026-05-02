"use client";

import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { TemplateBaseProps } from "@/types/template";

export const ElegantBlackBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
  return (
    /* Fondamenta del Layout: h-auto e overflow-visible per la visualizzazione corretta nel browser */
    <div 
      className="w-full h-auto min-h-full bg-white text-black overflow-visible font-sans" 
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
            margin: 1cm; /* Margine fisico di 1cm richiesto */
            size: A4;
            background-color: white !important;
          }
          #cv-ready {
            padding: 0 !important;
            height: auto !important;
            background-color: white !important;
          }
          /* Prevenzione tagli a metà dei blocchi di testo */
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
          margin-bottom: 0.5rem;
        }
        .quill-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          font-size: 14px;
          line-height: 1.5;
        }
        .quill-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Container interno con padding di 1cm che simula il margine di stampa */}
      <div className="p-[1cm] flex flex-col h-auto bg-white">
        
        {/* HEADER - Identità e Contatti */}
        <div className="flex flex-col items-center paginate-item">
          {(data?.name || data?.surname) && (
            <p className="cvMainTitle-ElegantBlack text-center">
              {data?.name} {data?.surname}
            </p>
          )}
          {data?.desiredJob && (
            <p className="font-medium text-[22px] text-center">{data?.desiredJob}</p>
          )}
          
          <div className="flex flex-col items-center mt-2 text-sm">
            {data?.address && showHide?.showAddress && (
              <p className="cvDataTitle-ElegantBlack mb-1">{data?.address}</p>
            )}
            {data?.dateOfBirth && showHide?.showDateOfBirth && (
              <p className="cvDataTitle-ElegantBlack mb-1">{data?.dateOfBirth}</p>
            )}
          </div>

          <div className="flex justify-between w-full mb-1 mt-2">
            {data?.phone && (
              <p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center text-sm">
                <BsFillTelephoneFill size={12} />
                {data?.phone}
              </p>
            )}
            {data?.email && (
              <p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center text-sm">
                <IoMail size={14} />
                {data?.email}
              </p>
            )}
          </div>
          <hr className="border w-full border-black mb-4" />
        </div>

        {/* BIO / PROFILO[cite: 1] */}
        {(data?.bio && showHide?.showBio) && (
          <div className="paginate-item mb-6">
            <div 
              className="quill-content"
              dangerouslySetInnerHTML={{ __html: data.bio || "" }} 
            />
            
            <div className="flex justify-between w-full mt-4 border-t border-gray-100 pt-2">
              {data?.relocation && (
                <p className="text-sm">
                  <span className="font-bold">Condition to relocate: </span>
                  {data?.relocation}
                </p>
              )}
              {data?.ral && (
                <p className="text-sm">
                  <span className="font-bold">Desired Ral: </span>
                  {data?.ral}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ESPERIENZA LAVORATIVA[cite: 1] */}
        {data?.experience && data?.experience.length > 0 && (
          <div className="flex flex-col mb-4">
            <div className="paginate-item cvSeparator-div-ElegantBlack mb-4">
              <p className="cvTitle-ElegantBlack">Employment History</p>
            </div>
            {data?.experience.map((exp, index) => (
              <div key={index} className="paginate-item mb-6">
                <div className="flex flex-row justify-between pb-1 border-b border-gray-100 mb-2">
                  <p className="font-bold uppercase text-sm">{exp.title}</p>
                  <p className="text-sm italic">{exp.years}</p>
                </div>
                <div 
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: exp.exps || "" }} 
                />
              </div>
            ))}
          </div>
        )}

        {/* EDUCAZIONE[cite: 1] */}
        {data?.education && data?.education.length > 0 && (
          <div className="flex flex-col mb-4">
            <div className="paginate-item cvSeparator-div-ElegantBlack mb-4">
              <p className="cvTitle-ElegantBlack">Education</p>
            </div>
            {data?.education.map((edu, index) => (
              <div key={index} className="paginate-item mb-6">
                <div className="flex flex-row justify-between pb-1 border-b border-gray-100 mb-2">
                  <p className="font-bold uppercase text-sm">{edu.etitle}</p>
                  <p className="text-sm italic">{edu.eyears}</p>
                </div>
                <div 
                  className="quill-content"
                  dangerouslySetInnerHTML={{ __html: edu.edu || "" }} 
                />
              </div>
            ))}
          </div>
        )}

        {/* SKILLS SECTION[cite: 1] */}
        {((data?.softSkillss && data?.softSkillss.length > 0) || 
          (data?.skillss && data?.skillss.length > 0) || 
          (data?.langSkillss && data?.langSkillss.length > 0)) && (
          <div className="paginate-item mt-4">
            <div className="cvSeparator-div-ElegantBlack mb-4 h-[28px]"></div>
            
            {data?.skillss && data?.skillss.length > 0 && (
              <div className="mb-4">
                <div className="flex w-full mb-1 items-center flex-wrap">
                  <p className="font-bold text-sm mr-4">Skills:</p>
                  <div className="flex flex-wrap gap-x-4">
                    {data?.skillss.map((skill, index) => (
                      <p className="text-sm" key={index}>{skill}</p>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200" />
              </div>
            )}

            {data?.softSkillss && data?.softSkillss.length > 0 && (
              <div className="mb-4">
                <div className="flex w-full mb-1 items-center flex-wrap">
                  <p className="font-bold text-sm mr-4">Soft skills:</p>
                  <div className="flex flex-wrap gap-x-4">
                    {data?.softSkillss.map((skill, index) => (
                      <p className="text-sm" key={index}>{skill}</p>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200" />
              </div>
            )}

            {data?.langSkillss && data?.langSkillss.length > 0 && (
              <div className="mb-4">
                <div className="flex w-full mb-1 items-center flex-wrap">
                  <p className="font-bold text-sm mr-4">Languages:</p>
                  <div className="flex flex-wrap gap-x-4">
                    {data?.langSkillss.map((skill, index) => (
                      <p className="text-sm" key={index}>{skill}</p>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200" />
              </div>
            )}
          </div>
        )}

        {/* PROFILI PROFESSIONALI[cite: 1] */}
        {(data?.website || data?.dribble || data?.github || data?.linkedin) && (
          <div className="paginate-item mt-auto pt-4">
            <p className="font-bold text-sm mb-2 uppercase tracking-tighter border-b border-black w-fit">
              Professional profiles:
            </p>
            <div className="flex w-full gap-4 flex-wrap">
              {data?.website && (
                <p className="text-xs flex items-center gap-1">
                  <CgWebsite size={14} /> {data?.website}
                </p>
              )}
              {data?.linkedin && (
                <p className="text-xs flex items-center gap-1">
                  <FaLinkedin size={14} /> {data?.linkedin}
                </p>
              )}
              {data?.github && (
                <p className="text-xs flex items-center gap-1">
                  <FaGithub size={14} /> {data?.github}
                </p>
              )}
              {data?.dribble && (
                <p className="text-xs flex items-center gap-1">
                  <FaDribbble size={14} /> {data?.dribble}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};