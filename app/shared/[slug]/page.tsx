"use client";
import { getPublicTemplate } from "@/actions/getPublicTemplate";
import { getPublicData } from "@/data/getPublicData"; // Assicurati che il percorso sia corretto
import PublicCvHandler from "../components/PublicCvHandler";
import ShowHide from "../components/ShowHide";
import { Provider } from "react-redux";
import { store } from "@/app/state/store";
import { useEffect, useState, use } from "react";

const page = ({ params }: { params: Promise<{ slug: string }> }) => {
	const resolvedParams = use(params);
    const slug = resolvedParams.slug;
	    const [template, setTemplate] = useState<string | null>();
    const [resumeData, setResumeData] = useState<any>(null); // Stato per i dati del CV

    useEffect(() => {
        const fetchPublicValues = async () => {
            try {
				const templateData = await getPublicTemplate(slug);
                const data = await getPublicData(slug);
                // Recupera il template e i dati in parallelo usando lo slug
            
                setTemplate(templateData);
                setResumeData(data);
            } catch (error) {
                console.error(
                    "Errore durante il recupero dei dati pubblici:",
                    error
                );
            }
        };

        fetchPublicValues(); // Nome corretto della funzione
    }, [slug]);

    return (
        <Provider store={store}>
            <div className="grid lg:grid-cols-2 xl:grid-cols-4 h-full">
                <div className="lg:col-span-1 bg-[#f8f8ff] overflow-auto scrollbar-hide shadow-2xl ">
                    {template != null && <ShowHide publicLink={slug} />}
                    {!template && (
                        <div className="lg:hidden h-max flex justify-center items-center">
                            <div className="bg-red-400 w-auto mt-10 text-white text-center p-5 rounded-md">
                                This url does not exist or has been deleted by the user!
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden lg:block xl:col-span-3 lg:col-span-1 overflow-auto scrollbar-hide text-white">
                    {template != null && (
                        <PublicCvHandler
                            selectedTemplate={template}
                            resumeData={resumeData} // Passiamo i dati al componente
                            publicLink={slug}
                        />
                    )}
                    {!template && (
                        <div id="error" className="flex h-full justify-center items-center">
                            <div className="bg-red-400 w-[400px] text-white text-center p-5 rounded-md">
                                This url does not exist or has been deleted by the user!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Provider>
    );
};

export default page;