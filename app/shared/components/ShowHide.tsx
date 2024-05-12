"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaFileDownload } from "react-icons/fa";
import {
    getShowHideOptions,
    getShowHidePublicOptions,
} from "@/actions/showHideOptions";
import { StreamShowHidePublic } from "./StreamShowHidePublic";
import DownloadBtn from "@/components/downloadBtn/DownloadBtn";
// import { StreamShowHideOptions } from './StreamShowHideOptions';

interface ShowHideProps {
    publicLink: string;
}

const ShowHide: React.FC<ShowHideProps> = ({ publicLink }) => {
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
                console.log(data);
            } catch (error) {
                console.error("Error connecting to db ", error);
            }
        };

        fetchPublicValues();
    }, []);

    const handleSubmit = () => {
        return;
    };

    return (
        <div>
            <div className="block p-5 mt-5">
                <h1 className=" font-semibold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    Would you like to hide some personal data before downloading
                    the cv?
                </h1>
                <p className="font-regular  text-md text-slate-700">
                    Hide personal information for being DEIB compliant
                </p>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, errors }) => (
                    <Form className="p-5">
                        <label className="CheckBoxLabel">
                            <Field
                                type="checkbox"
                                name="showImage"
                                id="showImage"
                                disabled={!initialValues.showImage}
                                className="CheckBox"
                            />
                            Show your picture
                        </label>
                        <br />
                        <label className="CheckBoxLabel">
                            <Field
                                type="checkbox"
                                name="showAddress"
                                id="showAddress"
                                disabled={!initialValues.showAddress}
                                className="CheckBox"
                            />
                            Show your address
                        </label>
                        <br />
                        <label className="CheckBoxLabel">
                            <Field
                                type="checkbox"
                                name="showDateOfBirth"
                                id="showDateOfBirth"
                                disabled={!initialValues.showDateOfBirth}
                                className="CheckBox"
                            />
                            Show your date of birth
                        </label>
                        <br />
                        <label className="CheckBoxLabel">
                            <Field
                                type="checkbox"
                                name="showBio"
                                id="showBio"
                                disabled={!initialValues.showBio}
                                className="CheckBox"
                            />
                            Show your biography
                        </label>
                        <br />
                        <StreamShowHidePublic />
                    </Form>
                )}
            </Formik>
            <div className="flex justify-center p-5 items-center mt-10">
                {/* <button className="customBtnCol w-[100%] py-3 flex items-center justify-center gap-x-2 font-medium rounded-md">
                    <FaFileDownload className="text-lg" />
                    Download
                </button> */}
                <div className="w-[100%] cursor-pointer	">
                    <DownloadBtn
                        btnLocation={"public"}
                        template={initialValues.cvTemplate}
                        publicLink={publicLink}
                        style="customBtnCol w-[100%] py-3 flex items-center justify-center gap-x-2 font-medium rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShowHide;
