// "use client";
// import React, { useEffect, useState } from "react";
// import { deletePublicLink, savePublicLink } from "@/actions/publicLink";
// import { getPublic } from "@/data/public";

// interface PublicObject {
//     id: string;
//     userId: string;
//     showImage: boolean;
//     showAddress: boolean;
//     showDateOfBirth: boolean;
//     showBio: boolean;
//     publicLink?: string | null;
//     cvTemplate: string;
// }

// const ShareSettings = () => {
//     const [publicObject, setPublicObject] = useState<PublicObject | null>(null);
//     const [randomString, setRandomString] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchPublicValues = async () => {
//             try {
//                 const data = await getPublic();
//                 console.log(data);
//                 setPublicObject(data);
//                 if (data?.publicLink) {
//                     setRandomString(data.publicLink);
//                 }
//             } catch (error) {
//                 console.error("Error connecting to db ", error);
//             }
//         };

//         fetchPublicValues();
//     }, []);

//     const generateRandomString = async () => {
//         const characters =
//             "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//         let generatedString = "";
//         for (let i = 0; i < 9; i++) {
//             generatedString += characters.charAt(
//                 Math.floor(Math.random() * characters.length)
//             );
//         }
//         setRandomString(generatedString);
//         await savePublicLink(generatedString);
//     };

//     const deleteLink = async () => {
//         await deletePublicLink();
//         setRandomString(null);
//     };

//     return (
//         <div>
//             <div className="block p-5">
//                 <h1 className=" font-semibold text-3xl bg-gradient-to-r from-violet-600 to-violet-600 bg-clip-text text-transparent">
//                     Share your resume
//                 </h1>
//                 <p className="font-regular text-lg text-slate-700">
//                     Generate your public link, but share only what you want!
//                 </p>
//             </div>
//             <hr className="border-1 border-slate-300" />
//             <div className=" m-2 border-2 border-slate-200 overflow-hidden rounded-md flex lg:flex-col sm:p-7 p-2 lg:justify-center lg:items-start flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-center gap-x-5 lg:gap-x-0">
//                 <div
//                     id="publicLink"
//                     className="border my-5 sm:p-4 p-2 text-white w-auto bg-slate-800 rounded-md "
//                 >
//                     {randomString
//                         ? `https://localhost:3000/shared/${randomString}`
//                         : "https://localhost:3000/shared/examplelink"}
//                 </div>
//                 {!randomString && (
//                     <button
//                         className="sm:p-4 p-2 lg:mb-5 text-white bg-gradient-to-r from-violet-600 to-violet-600 rounded-md"
//                         onClick={generateRandomString}
//                     >
//                         Generate link
//                     </button>
//                 )}
//                 {randomString && (
//                     <button
//                         className="sm:p-4 p-2 lg:mb-5 text-white bg-red-600 rounded-md"
//                         onClick={deleteLink}
//                     >
//                         Delete link
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ShareSettings;
"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
    MdShare,
    MdLink,
    MdLinkOff,
    MdContentCopy,
    MdCheck,
} from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import ShowHide from "./ShowHide";
import { savePublicLink, deletePublicLink } from "@/actions/publicLink";
import { getPublic } from "@/data/public";

const ShareSettings = () => {
    const [isPending, startTransition] = useTransition();
    const [copied, setCopied] = useState(false);
    const [publicData, setPublicData] = useState<any>(null);

    // Caricamento iniziale dei dati dal DB
    useEffect(() => {
        const fetchPublicValues = async () => {
            try {
                const data = await getPublic();
                if (data) setPublicData(data);
            } catch (error) {
                console.error("Error connecting to db ", error);
            }
        };
        fetchPublicValues();
    }, []);

    const shareUrl = publicData?.publicLink
        ? `${window.location.origin}/shared/${publicData.publicLink}`
        : "";

    const handleCopy = () => {
        if (!shareUrl) return;
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const onGenerateLink = () => {
        startTransition(async () => {
            const result = await savePublicLink();
            if (result?.slug) {
                setPublicData((prev: any) => ({
                    ...prev,
                    publicLink: result.slug,
                }));
            }
        });
    };

    const onDeleteLink = () => {
        startTransition(async () => {
            await deletePublicLink();
            setPublicData((prev: any) => ({ ...prev, publicLink: null }));
        });
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-10">
            <div className="flex sticky top-0 bg-white/80 backdrop-blur-md justify-between items-center z-50 border-b border-slate-200 px-6 py-4 shadow-sm mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <MdShare className="primary" />
                    Share Settings
                </h2>
                <Button
                    form="share-settings-form"
                    type="submit"
                    disabled={isPending}
                    className="gap-x-2 bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                >
                    <RiSave3Fill size={18} />
                    Save Settings
                </Button>
            </div>

            <div className="space-y-6">
                {/* LINK MANAGEMENT */}
                <div className="bg-white p-6 mx-4 border border-slate-100 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <MdLink className="primary" />
                        Link Management
                    </h3>

                    {!publicData?.publicLink ? (
                        <div className="text-center py-4">
                            <p className="text-sm text-slate-500 mb-4">
                                No public link generated yet.
                            </p>
                            <Button
                                onClick={onGenerateLink}
                                disabled={isPending}
                                className="w-full bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200"
                            >
                                Generate Public Link
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                                <input
                                    readOnly
                                    value={shareUrl}
                                    className="bg-transparent border-none outline-none text-sm text-slate-600 flex-1 px-2"
                                />
                                <Button
                                    onClick={handleCopy}
                                    variant="ghost"
                                    size="sm"
                                    className={
                                        copied
                                            ? "text-green-600"
                                            : "text-violet-600"
                                    }
                                >
                                    {copied ? (
                                        <MdCheck size={18} />
                                    ) : (
                                        <MdContentCopy size={18} />
                                    )}
                                </Button>
                            </div>
                            <Button
                                onClick={onDeleteLink}
                                disabled={isPending}
                                variant="destructive"
                                className="w-full gap-2 text-xs opacity-70 hover:opacity-100"
                            >
                                <MdLinkOff size={16} />
                                Disable & Delete Link
                            </Button>
                        </div>
                    )}
                </div>

                {/* VISIBILITY & TEMPLATE */}
                <div className="bg-white p-6 mx-4 border border-slate-100 rounded-xl shadow-sm">
                    <ShowHide publicData={publicData} />
                </div>
            </div>
        </div>
    );
};

export default ShareSettings;
