"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

const Anglo = () => {
  const object = useSelector((state: RootState) => state.updateValues);

  return (
    <div className="h-full w-full bg-white text-[#2c3e50] p-10 font-serif">
      {/* Header - Contatti al centro */}
      <div className="flex flex-col items-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-black">
          {object.name} {object.surname}
        </h1>
        <p className="text-lg font-medium text-gray-700 mt-1">{object.desiredJob}</p>
        <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-sm">
          {object.email && <span>{object.email}</span>}
          {object.phone && <span>• {object.phone}</span>}
          {object.address && <span>• {object.address}</span>}
          {object.website && <span>• {object.website}</span>}
        </div>
      </div>

      {/* Profilo Professionale */}
      {object.bio && (
        <div className="paginate-item mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">{object.bio}</p>
        </div>
      )}

      {/* Esperienza Lavorativa */}
      {object.experience && object.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic">Experience</h2>
          {object.experience.map((exp, index) => (
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
      {object.education && object.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic">Education</h2>
          {object.education.map((edu, index) => (
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
          {object.skillss && object.skillss.length > 0 && (
            <div>
              <p className="font-bold mb-1">Hard Skills:</p>
              <p>{object.skillss.join(", ")}</p>
            </div>
          )}
          {object.langSkillss && object.langSkillss.length > 0 && (
            <div>
              <p className="font-bold mb-1">Languages:</p>
              <p>{object.langSkillss.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anglo;