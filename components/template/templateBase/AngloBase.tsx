// "use client";
// import { TemplateBaseProps } from "@/types/template";

// export const AngloBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
//     return (
//         <div className="h-full w-full bg-white text-[#2c3e50] p-10 font-serif" id="cv-ready">
//             {/* Header - Contatti al centro */}
//             <div className="flex flex-col items-center border-b-2 border-gray-800 pb-4 mb-6">
//                 <h1 className="text-3xl font-bold uppercase tracking-widest text-black">
//                     {data?.name} {data?.surname}
//                 </h1>
//                 <p className="text-lg font-medium text-gray-700 mt-1">
//                     {data?.desiredJob}
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-sm">
//                     {data?.email && <span>{data?.email}</span>}
//                     {data?.phone && <span>• {data?.phone}</span>}
//                     {data?.address && showHide?.showAddress && (
//                         <span>• {data?.address}</span>
//                     )}
//                     {data?.website && <span>• {data?.website}</span>}
//                 </div>
//             </div>

//             {/* Profilo Professionale */}
//             {data?.bio && showHide?.showBio && (
//                 <div className="paginate-item mb-6">
//                     <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">
//                         Professional Summary
//                     </h2>
//                     <div
//                         className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
//                         dangerouslySetInnerHTML={{ __html: data.bio || "" }}
//                     />{" "}
//                 </div>
//             )}

//             {/* Esperienza Lavorativa */}
//             {data?.experience && data?.experience.length > 0 && (
//                 <div className="mb-6">
//                     <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic">
//                         Experience
//                     </h2>
//                     {data?.experience.map((exp, index) => (
//                         <div key={index} className="paginate-item mb-4">
//                             <div className="flex justify-between items-baseline">
//                                 <h3 className="font-bold text-black uppercase">
//                                     {exp.title}
//                                 </h3>
//                                 <span className="text-sm font-medium">
//                                     {exp.years}
//                                 </span>
//                             </div>
//                             <div
//                                 className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
//                                 dangerouslySetInnerHTML={{
//                                     __html: exp.exps || "",
//                                 }}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Educazione */}
//             {data?.education && data?.education.length > 0 && (
//                 <div className="mb-6">
//                     <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic">
//                         Education
//                     </h2>
//                     {data?.education.map((edu, index) => (
//                         <div key={index} className="paginate-item mb-2">
//                             <div className="flex justify-between items-baseline">
//                                 <h3 className="font-bold text-black uppercase">
//                                     {edu.etitle}
//                                 </h3>
//                                 <span className="text-sm font-medium">
//                                     {edu.eyears}
//                                 </span>
//                             </div>
//                             <div
//                                 className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
//                                 dangerouslySetInnerHTML={{
//                                     __html: edu.edu || "",
//                                 }}
//                             />{" "}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Skills */}
//             <div className="paginate-item">
//                 <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">
//                     Skills
//                 </h2>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                     {data?.skillss && data?.skillss.length > 0 && (
//                         <div>
//                             <p className="font-bold mb-1">Hard Skills:</p>
//                             <p>{data?.skillss.join(", ")}</p>
//                         </div>
//                     )}
//                     {data?.langSkillss && data?.langSkillss.length > 0 && (
//                         <div>
//                             <p className="font-bold mb-1">Languages:</p>
//                             <p>{data?.langSkillss.join(", ")}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
"use client";
import { TemplateBaseProps } from "@/types/template";

export const AngloBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
    return (
        <div className="h-full w-full bg-white text-[#2c3e50] font-serif" id="cv-ready">
            {/* 
                CSS per Puppeteer:
                1. Impostiamo il margine fisico della pagina a 1cm.
                2. Evitiamo che i blocchi con classe 'break-avoid' vengano spezzati tra le pagine.
            */}
            <style jsx global>{`
                @page {
                    margin: 1cm;
                    size: auto;
                }
                .break-avoid {
                    break-inside: avoid;
                    page-break-inside: avoid;
                    display: block; /* Assicura che il break-inside funzioni correttamente */
                }
                .quill-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                }
            `}</style>

            {/* Il padding interno simula il margine visivo nel builder */}
            <div className="p-[1cm]">
                
                {/* Header - Gestito come blocco unico per evitare tagli tra nome e contatti */}
                <div className="break-avoid flex flex-col items-center border-b-2 border-gray-800 pb-4 mb-6">
                    <h1 className="text-3xl font-bold uppercase tracking-widest text-black">
                        {data?.name} {data?.surname}
                    </h1>
                    <p className="text-lg font-medium text-gray-700 mt-1">
                        {data?.desiredJob}
                    </p>
                    <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-sm">
                        {data?.email && <span>{data?.email}</span>}
                        {data?.phone && <span>• {data?.phone}</span>}
                        {data?.address && showHide?.showAddress && (
                            <span>• {data?.address}</span>
                        )}
                        {data?.website && <span>• {data?.website}</span>}
                    </div>
                </div>

                {/* Profilo Professionale */}
                {data?.bio && showHide?.showBio && (
                    <div className="break-avoid mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">
                            Professional Summary
                        </h2>
                        <div
                            className="quill-content"
                            dangerouslySetInnerHTML={{ __html: data.bio || "" }}
                        />
                    </div>
                )}

                {/* Esperienza Lavorativa */}
                {data?.experience && data?.experience.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic break-avoid">
                            Experience
                        </h2>
                        {data?.experience.map((exp, index) => (
                            <div key={index} className="break-avoid mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-black uppercase">
                                        {exp.title}
                                    </h3>
                                    <span className="text-sm font-medium">
                                        {exp.years}
                                    </span>
                                </div>
                                <div
                                    className="quill-content"
                                    dangerouslySetInnerHTML={{
                                        __html: exp.exps || "",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Educazione */}
                {data?.education && data?.education.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 italic break-avoid">
                            Education
                        </h2>
                        {data?.education.map((edu, index) => (
                            <div key={index} className="break-avoid mb-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-black uppercase">
                                        {edu.etitle}
                                    </h3>
                                    <span className="text-sm font-medium">
                                        {edu.eyears}
                                    </span>
                                </div>
                                <div
                                    className="quill-content"
                                    dangerouslySetInnerHTML={{
                                        __html: edu.edu || "",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                <div className="break-avoid">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 italic">
                        Skills
                    </h2>
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
        </div>
    );
};