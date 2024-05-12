"use client";
import { getPublicTemplate } from "@/actions/getPublicTemplate";
import PublicCvHandler from "../components/PublicCvHandler";
import ShowHide from "../components/ShowHide";
import { Provider } from "react-redux";
import { store } from "@/app/state/store";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { slug: string } }) => {
    const [template, setTemplate] = useState<string | null>();

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const templateData = await getPublicTemplate(params.slug);
                setTemplate(templateData);
            } catch (error) {
                console.error(
                    "Errore durante il recupero del template:",
                    error
                );
            }
        };

        fetchTemplate();
    }, [params.slug]);
    return (
        <Provider store={store}>
            <div className="grid lg:grid-cols-2 xl:grid-cols-4 h-full">
                <div className="lg:col-span-1 bg-[#f8f8ff] overflow-auto scrollbar-hide shadow-2xl ">
                    {/* <div className="block p-5">
                        <h1 className=" font-semibold text-3xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            Share your resume
                        </h1>
                        <p className="font-regular text-lg text-slate-700">
                            Generate your public link, but share only what you
                            want!
                        </p>
                    </div>
                    <hr className="border-1 border-slate-300" /> */}
                    {template != null &&<ShowHide publicLink={params.slug} />}
					{!template && (
                        <>
                            <div
                                className=" lg:hidden h-max flex justify-center items-center "
                            >
                                <div className="bg-red-400 w-auto mt-10 text-white text-center p-5 rounded-md">
                                    This url does not exist or has been deleted
                                    by the user!
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="hidden lg:block xl:col-span-3 lg:col-span-1 overflow-auto scrollbar-hide text-white">
                    {template != null && (
                        <PublicCvHandler
                            selectedTemplate={template}
                            publicLink={params.slug}
                        />
                    )}
                    {!template && (
                        <>
                            <div
                                id="error"
                                className="flex h-full justify-center items-center "
                            >
                                <div className="bg-red-400 w-[400px] text-white text-center p-5 rounded-md">
                                    This url does not exist or has been deleted
                                    by the user!
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Provider>
    );
};

export default page;
