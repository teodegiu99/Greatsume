"use client";
import React, { useEffect, useState } from "react";
import { deletePublicLink, savePublicLink } from "@/actions/publicLink";
import { getPublic } from "@/data/public";

interface PublicObject {
    id: string;
    userId: string;
    showImage: boolean;
    showAddress: boolean;
    showDateOfBirth: boolean;
    showBio: boolean;
    publicLink?: string | null;
    cvTemplate: string;
}

const ShareSettings = () => {
    const [publicObject, setPublicObject] = useState<PublicObject | null>(null);
    const [randomString, setRandomString] = useState<string | null>(null);

    useEffect(() => {
        const fetchPublicValues = async () => {
            try {
                const data = await getPublic();
                console.log(data);
                setPublicObject(data);
                if (data?.publicLink) {
                    setRandomString(data.publicLink);
                }
            } catch (error) {
                console.error("Error connecting to db ", error);
            }
        };

        fetchPublicValues();
    }, []);

    const generateRandomString = async () => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let generatedString = "";
        for (let i = 0; i < 9; i++) {
            generatedString += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        setRandomString(generatedString);
        await savePublicLink(generatedString);
    };

    const deleteLink = async () => {
        await deletePublicLink();
        setRandomString(null);
    };

    return (
        <div>
            <div className="block p-5">
                <h1 className=" font-semibold text-3xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Share your resume
                </h1>
                <p className="font-regular text-lg text-slate-700">
                    Generate your public link, but share only what you want!
                </p>
            </div>
            <hr className="border-1 border-slate-300" />
            <div className=" m-2 border-2 border-slate-200 overflow-hidden rounded-md flex lg:flex-col sm:p-7 p-2 lg:justify-center lg:items-start flex-col justify-center items-center sm:flex-row sm:justify-start sm:items-center gap-x-5 lg:gap-x-0">
                <div
                    id="publicLink"
                    className="border my-5 sm:p-4 p-2 text-white w-auto bg-slate-800 rounded-md "
                >
                    {randomString
                        ? `https://localhost:3000/shared/${randomString}`
                        : "https://localhost:3000/shared/examplelink"}
                </div>
                {!randomString && (
                    <button
                        className="sm:p-4 p-2 lg:mb-5 text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
                        onClick={generateRandomString}
                    >
                        Generate link
                    </button>
                )}
                {randomString && (
                    <button
                        className="sm:p-4 p-2 lg:mb-5 text-white bg-red-600 rounded-md"
                        onClick={deleteLink}
                    >
                        Delete link
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShareSettings;
