'use client'
import { TemplateBaseProps } from "@/types/template";

export const AngloBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
  return (
    <div className="h-full w-full bg-white text-[#2c3e50] p-10 font-serif">
      {/* Header - Contatti al centro */}
      <div className="flex flex-col items-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-black">
          {data?.name} {data?.surname}
        </h1>
        <p className="text-lg font-medium text-gray-700 mt-1">{data?.desiredJob}</p>
        <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-sm">
          {data?.email && <span>{data?.email}</span>}
          {data?.phone && <span>• {data?.phone}</span>}
          {data?.address && showHide?.showAddress && <span>• {data?.address}</span>}
          {data?.website && <span>• {data?.website}</span>}
        </div>
      </div>

      {/* Profilo Professionale */}
      {data?.bio && showHide?.showBio && (
        <div className="paginate-item mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">{data?.bio}</p>
        </div>
      )}

      {/* Esperienza Lavorativa */}
      {data?.experience && data?.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic">Experience</h2>
          {data?.experience.map((exp, index) => (
            <div key={index} className="paginate-item mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-black uppercase">{exp.title}</h3>
                <span className="text-sm font-medium">{exp.years}</span>
              </div>
              <p className="text-sm whitespace-pre-line mt-1">{exp.exps}</p>
            </div>
          ))}
        </div>
      )}

      {/* Educazione */}
      {data?.education && data?.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic">Education</h2>
          {data?.education.map((edu, index) => (
            <div key={index} className="paginate-item mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-black uppercase">{edu.etitle}</h3>
                <span className="text-sm font-medium">{edu.eyears}</span>
              </div>
              <p className="text-sm">{edu.edu}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      <div className="paginate-item">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">Skills</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {data?.skillss && data?.skillss.length > 0 && (
            <div>
              <p className="font-bold mb-1">Hard Skills:</p>
              <p>{data?.skillss.join(", ")}</p>
            </div>
          )}
          {data?.langSkillss && data?.langSkillss.length > 0 && (
            <div>
              <p className="font-bold mb-1">Languages:</p>
              <p>{data?.langSkillss.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
