"use client";
import { getPublicTemplate } from "@/actions/getPublicTemplate";
import { getPublicData } from "@/data/getPublicData";
import PublicCvHandler from "../components/PublicCvHandler";
import ShowHide from "../components/ShowHide";
import { Provider } from "react-redux";
import { store } from "@/app/state/store";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // <-- 1. Importa questo

const page = () => {
    // 2. Leggi lo slug in modo sicuro e sincrono
    const params = useParams();
    const slug = params?.slug as string;

    const [template, setTemplate] = useState<string | null>(null);
    const [resumeData, setResumeData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 3. Aspetta che lo slug sia effettivamente disponibile
        if (!slug) return; 

        const fetchPublicValues = async () => {
            try {
                const templateData = await getPublicTemplate(slug);
                const data = await getPublicData(slug);
                
                setTemplate(templateData);
                setResumeData(data);
            } catch (error) {
                console.error("Errore durante il recupero dei dati pubblici:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublicValues();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="h-full flex justify-center items-center text-slate-500">
                Preparazione del Curriculum in corso...
            </div>
        );
    }

    return (
        <Provider store={store}>
            {/* 4. Assicurati che l'id="cv-ready" sia ESATTAMENTE qui */}
            <div id="cv-ready" className="grid lg:grid-cols-2 xl:grid-cols-4 h-full print:block">
                
                <div className="lg:col-span-1 bg-[#f8f8ff] overflow-auto scrollbar-hide shadow-2xl print:hidden">
                    {template != null && <ShowHide publicLink={slug} />}
                    {!template && (
                        <div className="lg:hidden h-max flex justify-center items-center">
                            <div className="bg-red-400 w-auto mt-10 text-white text-center p-5 rounded-md">
                                Questo URL non esiste o è stato eliminato dall'utente!
                            </div>
                        </div>
                    )}
                </div>

                <div className="hidden lg:block xl:col-span-3 lg:col-span-1 overflow-auto scrollbar-hide text-white print:block">
                    {template != null && (
                       <PublicCvHandler
    templateName={template}  // Cambiato da selectedTemplate
    initialData={resumeData} // Cambiato da resumeData
    publicLink={slug}
/>
                    )}
                    {!template && (
                        <div id="error" className="flex h-full justify-center items-center">
                            <div className="bg-red-400 w-[400px] text-white text-center p-5 rounded-md">
                                Questo URL non esiste o è stato eliminato dall'utente!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Provider>
    );
};

export default page;