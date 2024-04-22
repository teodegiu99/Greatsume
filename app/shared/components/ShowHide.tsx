"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaFileDownload } from "react-icons/fa";
import {
    getShowHideOptions,
    getShowHidePublicOptions,
} from "@/actions/showHideOptions";
import { StreamShowHidePublic } from "./StreamShowHidePublic";
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
            <div className="block p-5">
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
                        <label>
                            <Field
                                type="checkbox"
                                name="showImage"
                                id="showImage"
                                disabled={!initialValues.showImage}
                            />
                            Show your picture
                        </label>
                        <br />
                        <label>
                            <Field
                                type="checkbox"
                                name="showAddress"
                                id="showAddress"
                                disabled={!initialValues.showAddress}
                            />
                            Show your address
                        </label>
                        <br />
                        <label>
                            <Field
                                type="checkbox"
                                name="showDateOfBirth"
                                id="showDateOfBirth"
                                disabled={!initialValues.showDateOfBirth}
                            />
                            Show your date of birth
                        </label>
                        <br />
                        <label>
                            <Field
                                type="checkbox"
                                name="showBio"
                                id="showBio"
                                disabled={!initialValues.showBio}
                            />
                            Show your biography
                        </label>
                        <br />
                        <StreamShowHidePublic />
                    </Form>
                )}
            </Formik>
            <div className="flex justify-center items-center mt-10">
                <button className="customBtnCol w-[75%] py-3 flex items-center justify-center gap-x-2 font-medium rounded-md">
                    <FaFileDownload className="text-lg" />
                    Download
                </button>
            </div>
        </div>
    );
};

export default ShowHide;
