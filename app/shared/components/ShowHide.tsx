"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    MdPrivacyTip,
    MdPerson,
    MdLocationOn,
    MdCake,
    MdArticle,
} from "react-icons/md";
import { getShowHidePublicOptions } from "@/actions/showHideOptions";
import { StreamShowHidePublic } from "./StreamShowHidePublic";
import DownloadBtn from "@/components/downloadBtn/DownloadBtn";

interface ShowHideProps {
    publicLink: string;
}

const ShowHide: React.FC<ShowHideProps> = ({ publicLink }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialValues, setInitialValues] = useState({
        showImage: true,
        showAddress: true,
        showDateOfBirth: true,
        showBio: true,
        cvTemplate: "ClassicBlue",
    });

    useEffect(() => {
        const fetchPublicValues = async () => {
            try {
                const data = await getShowHidePublicOptions(publicLink);
                if (data) {
                    setInitialValues({
                        showAddress: data.showAddress,
                        showBio: data.showBio,
                        showDateOfBirth: data.showDateOfBirth,
                        showImage: data.showImage,
                        cvTemplate: data.cvTemplate,
                    });
                }
            } catch (error) {
                console.error("Error connecting to db ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPublicValues();
    }, [publicLink]);

    const handleSubmit = () => {
        // Nessuna azione al submit, i valori vengono gestiti in tempo reale
        // o prelevati dal DownloadBtn tramite lo store
        return;
    };

    // Configurazione delle opzioni per evitare codice ripetitivo (DRY)
    const toggleOptions = [
        { name: "showImage", label: "Show your picture", icon: MdPerson },
        { name: "showAddress", label: "Show your address", icon: MdLocationOn },
        {
            name: "showDateOfBirth",
            label: "Show your date of birth",
            icon: MdCake,
        },
        { name: "showBio", label: "Show your biography", icon: MdArticle },
    ] as const;

    return (
        <div className="bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
            {/* Intestazione della Card */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <MdPrivacyTip className="primary" />
                    Privacy Options
                </h3>
                <p className="text-sm text-slate-500">
                    Hide personal information to ensure DEIB compliance before
                    downloading the CV.
                </p>
            </div>

            {/* Stato di caricamento o Form */}
            {isLoading ? (
                <div className="animate-pulse space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-14 bg-slate-100 rounded-lg w-full"
                        ></div>
                    ))}
                </div>
            ) : (
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-4">
                            <div className="space-y-3">
                                {toggleOptions.map((opt) => {
                                    // Se il creatore del CV ha nascosto un campo, il visitatore non può riattivarlo
                                    const isOwnerHidden =
                                        !initialValues[
                                            opt.name as keyof typeof initialValues
                                        ];

                                    return (
                                        <label
                                            key={opt.name}
                                            className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                                                isOwnerHidden
                                                    ? "bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed"
                                                    : "hover:border-violet-300 cursor-pointer bg-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <opt.icon
                                                    className={
                                                        isOwnerHidden
                                                            ? "text-slate-400"
                                                            : "primary"
                                                    }
                                                    size={22}
                                                />
                                                <span className="text-sm font-medium text-slate-700">
                                                    {opt.label}
                                                </span>
                                            </div>
                                            <Field
                                                type="checkbox"
                                                name={opt.name}
                                                id={opt.name}
                                                disabled={isOwnerHidden}
                                                className={`w-5 h-5 rounded border-slate-300 !text-violet-600 accent-violet-600 focus:ring-violet-500 ${
                                                    isOwnerHidden
                                                        ? "cursor-not-allowed"
                                                        : "cursor-pointer"
                                                }`}
                                            />
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Eventuali altre opzioni Stream */}
                            <div className="mt-4">
                                <StreamShowHidePublic />
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

            {/* Area per il Download Button */}
            <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="w-full cursor-pointer">
                    <DownloadBtn
                        btnLocation={"public"}
                        template={initialValues.cvTemplate}
                        publicLink={publicLink}
                        style="w-full py-3.5 flex items-center justify-center gap-x-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShowHide;
