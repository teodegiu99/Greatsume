"use client";
import { Button } from "@/components/ui/button";
import { RiSave3Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {
    Formik,
    Field,
    Form,
    ErrorMessage,
    FieldArray,
    FieldProps,
} from "formik";
import { resume } from "@/actions/resume";
import React, { useState, useId } from "react";
import Select from "react-select";

const TopBar = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);

    const [softInputValue, setSoftInputValue] = useState<string>("");
    const [softSkills, setSoftSkills] = useState<string[]>([]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            if (inputValue.trim() !== "") {
                setSkills((prevSkills) => [...prevSkills, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const preventSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
    }

    const handleSoftKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            if (softInputValue.trim() !== "") {
                setSoftSkills((prevSoftSkills) => [
                    ...prevSoftSkills,
                    softInputValue.trim(),
                ]);
                setSoftInputValue("");
            }
        }
    };

    const handleDeleteSkill = (index: number) => {
        setSkills((prevSkills) => prevSkills.filter((_, idx) => idx !== index));
    };
    const handleDeleteSoftSkill = (index: number) => {
        setSoftSkills((prevSoftSkills) =>
            prevSoftSkills.filter((_, idx) => idx !== index)
        );
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "38px",
            "&:hover": {
                border: "1px solid #ccc",
            },
        }),
    };
    const initialValues = {
        name: "",
        surname: "",
        address: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        dribble: "",
        website: "",
        bio: "",
        desiredJob: "",
        ral: "",
        experience: [
            {
                years: "",
                exps: "",
            },
        ],
        education: [
            {
                eyears: "",
                edu: "",
            },
        ],
        skillss: [""],
        softSkillss: [""],
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    values.skillss = [...skills];
                    values.softSkillss = [...softSkills];

                    console.log(values);
                    resume(values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="flex justify-between items-center border-b-2 border-slate-200">
                            <h3 className="text-start m-4 formTitle">
                                Build your resume
                            </h3>
                            <Button
                                className="gap-x-2 customBtnCol m-4"
                                size="lg"
                                type="submit"
                            >
                                <RiSave3Fill />
                                Save
                            </Button>
                        </div>

                        <h3 className="text-start m-4 formTitle">
                            Personal Informations
                        </h3>
                        <div className="grid grid-cols-2 gap-4  p-4 m-2 border-2 border-slate-200 rounded-md">
                            <div>
                                <label htmlFor="name" className="formLabel">
                                    Name
                                </label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Matteo"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}
                                />
                            </div>
                            <div>
                                <label htmlFor="surname" className="formLabel">
                                    Surname
                                </label>
                                <Field
                                    id="surname"
                                    name="surname"
                                    placeholder="De Giuseppe"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address" className="formLabel ">
                                    Address
                                </label>
                                <Field
                                    id="address"
                                    name="address"
                                    placeholder="767 5th Ave, New York, NY 10153, United States"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="dateOfBirth"
                                    className="formLabel"
                                >
                                    Date Of Birth
                                </label>
                                <Field
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    placeholder="07/28/1999"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                        </div>
                        <h3 className="text-start m-4 formTitle">Contacts</h3>
                        <div className="grid grid-cols-2 gap-4  p-4 m-2 border-2 border-slate-200 rounded-md">
                            <div>
                                <label htmlFor="phone" className="formLabel">
                                    Phone
                                </label>
                                <Field
                                    id="phone"
                                    name="phone"
                                    placeholder="+39 123456789"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="formLabel">
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="mail@example.com"
                                    type="email"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="linkedin"
                                    className="formLabel "
                                >
                                    LinkedIn
                                </label>
                                <Field
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="https://Linkedin.com/yourName"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div>
                                <label htmlFor="github" className="formLabel">
                                    Github
                                </label>
                                <Field
                                    id="github"
                                    name="github"
                                    placeholder="https://github.com/teodegiu99"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div>
                                <label htmlFor="dribble" className="formLabel">
                                    Dribble
                                </label>
                                <Field
                                    id="dribble"
                                    name="dribble"
                                    placeholder="https://dribble.com/asYouCanSeeImNotADesigner"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="formLabel">
                                    Website
                                </label>
                                <Field
                                    id="website"
                                    name="website"
                                    placeholder="https://matteodegiuseppe.com"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4  p-4 m-2 border-2 border-slate-200 rounded-md">
                            <div className="col-span-4">
                                <label htmlFor="bio" className="formLabel">
                                    Bio
                                </label>
                                <Field
                                    as="textarea"
                                    id="bio"
                                    name="bio"
                                    placeholder="Matteo"
                                    rows="4"
                                    type="text"
                                    className="textArea"
                                />
                            </div>
                            <div className="col-span-3">
                                <label
                                    htmlFor="desiredJob"
                                    className="formLabel"
                                >
                                    Desired Job Position
                                </label>
                                <Field
                                    id="desiredJob"
                                    name="desiredJob"
                                    placeholder="Frontend Developer"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="ral" className="formLabel ">
                                    RAL
                                </label>
                                <Field
                                    id="ral"
                                    name="ral"
                                    placeholder="€200000"
                                    type="text"
                                    className="inputField"
                                    onKeyDown={preventSubmit}

                                />
                            </div>
                        </div>
                        <h3 className="text-start m-4 formTitle">
                            Hard Skills
                        </h3>
                        <div className="p-4 m-2 border-2 border-slate-200 rounded-md">
                            <Field name="skills" instanceId={useId()}>
                                {(props: FieldProps) => (
                                    <div>
                                        <Select
                                            {...props.field}
                                            instanceId={useId()}
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null,
                                            }}
                                            options={[]}
                                            isMulti
                                            placeholder="Seleziona o inserisci una skill"
                                            inputValue={inputValue}
                                            onInputChange={(value) =>
                                                setInputValue(value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            styles={customStyles}
                                            menuIsOpen={false}
                                        />
                                        <div className="flex flex-wrap p-2 mt-2 gap-x-2">
                                            {skills.map((skill, index) => (
                                                <div
                                                    className="ring-1 rounded-sm ring-slate-200"
                                                    key={index}
                                                >
                                                    <div
                                                        key={index}
                                                        className="flex p-2 "
                                                    >
                                                        {skill}
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteSkill(
                                                                    index
                                                                )
                                                            }
                                                            className=" text-red-500 text-xl"
                                                        >
                                                            <MdDelete className="ml-2" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <h3 className="text-start m-4 formTitle">
                            Soft Skills
                        </h3>

                        <div className="p-4 m-2 border-2 border-slate-200 rounded-md">
                            <Field name="softSkills" instanceId={useId()}>
                                {(props: FieldProps) => (
                                    <div>
                                        <Select
                                            {...props.field}
                                            options={[]}
                                            instanceId={useId()}
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null,
                                            }}
                                            isMulti
                                            placeholder="Seleziona o inserisci una soft skill"
                                            inputValue={softInputValue}
                                            onInputChange={(value) =>
                                                setSoftInputValue(value)
                                            }
                                            onKeyDown={handleSoftKeyDown}
                                            styles={customStyles}
                                            menuIsOpen={false}
                                        />
                                        <div className="flex flex-wrap p-2 mt-2 gap-x-2">
                                            {softSkills.map(
                                                (softSkill, softindex) => (
                                                    <div
                                                        className="ring-1 rounded-sm ring-slate-200"
                                                        key={softindex}
                                                    >
                                                        <div
                                                            key={softindex}
                                                            className="flex  p-2"
                                                        >
                                                            {softSkill}
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteSoftSkill(
                                                                        softindex
                                                                    )
                                                                }
                                                                className=" text-red-500 text-xl"
                                                            >
                                                                <MdDelete className="ml-2" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Field>
                        </div>

                        <h3 className="text-start m-4 formTitle">Experience</h3>

                        <FieldArray name="experience">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.experience.length > 0 &&
                                        values.experience.map(
                                            (exp, expindex) => (
                                                <div
                                                    className="row p-4 m-2 border-2 border-slate-200 rounded-md"
                                                    key={expindex}
                                                >
                                                    <div className="row">
                                                        <div className="flex  justify-end">
                                                            <button
                                                                type="button"
                                                                className="p-1"
                                                                onClick={() =>
                                                                    remove(
                                                                        expindex
                                                                    )
                                                                }
                                                            >
                                                                <MdDelete className="w-5 h-5 text-red-500" />
                                                            </button>
                                                        </div>
                                                        <label
                                                            htmlFor={`experience.${expindex}.years`}
                                                            className="formLabel"
                                                        >
                                                            Working years
                                                        </label>
                                                        <div className="col">
                                                            <Field
                                                                className="inputFieldArray"
                                                                id={`experience.${expindex}.years`}
                                                                name={`experience.${expindex}.years`}
                                                                placeholder="2020-2024"
                                                                type="text"
                                                                onKeyDown={preventSubmit}

                                                            />
                                                            <ErrorMessage
                                                                name={`experience.${expindex}.years`}
                                                                component="div"
                                                                className="field-error"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label
                                                            htmlFor={`experience.${expindex}.exps`}
                                                            className="formLabel"
                                                        >
                                                            Experience
                                                        </label>
                                                        <div className="col">
                                                            <Field
                                                                as="textarea"
                                                                id={`experience.${expindex}.exps`}
                                                                className="textArea"
                                                                name={`experience.${expindex}.exps`}
                                                                placeholder="I've worked for google as a..."
                                                                type="text"
                                                                rows="4"
                                                            />
                                                            <ErrorMessage
                                                                name={`experience.${expindex}.exps`}
                                                                component="div"
                                                                className="field-error"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    <div className="block">
                                        <div className="flex justify-end m-2">
                                            <button
                                                type="button"
                                                className="customBtnCol px-4 py-2 rounded-sm"
                                                onClick={() =>
                                                    push({
                                                        years: "",
                                                        exps: "",
                                                    })
                                                }
                                            >
                                                Add experience
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                        <h3 className="text-start m-4 formTitle">Education</h3>

                        <FieldArray name="education">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.education.length > 0 &&
                                        values.education.map(
                                            (edu, eduindex) => (
                                                <div
                                                    className="row p-4 m-2 border-2 border-slate-200 rounded-md"
                                                    key={eduindex}
                                                >
                                                    <div className="row">
                                                        <div className="flex  justify-end">
                                                            <button
                                                                type="button"
                                                                className="p-1"
                                                                onClick={() =>
                                                                    remove(
                                                                        eduindex
                                                                    )
                                                                }
                                                            >
                                                                <MdDelete className="w-5 h-5 text-red-500" />
                                                            </button>
                                                        </div>
                                                        <label
                                                            htmlFor={`education.${eduindex}.eyears`}
                                                            className="formLabel"
                                                        >
                                                            Year of graduation
                                                        </label>
                                                        <div className="col">
                                                            <Field
                                                                className="inputFieldArray"
                                                                id={`education.${eduindex}.eyears`}
                                                                name={`education.${eduindex}.eyears`}
                                                                placeholder="2020-2024"
                                                                type="text"
                                                                onKeyDown={preventSubmit}

                                                            />
                                                            <ErrorMessage
                                                                name={`education.${eduindex}.eyears`}
                                                                component="div"
                                                                className="field-error"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label
                                                            htmlFor={`education.${eduindex}.edu`}
                                                            className="formLabel"
                                                        >
                                                            Education
                                                        </label>
                                                        <div className="col">
                                                            <Field
                                                                as="textarea"
                                                                id={`education.${eduindex}.edu`}
                                                                className="textArea"
                                                                name={`education.${eduindex}.edu`}
                                                                placeholder="I've worked for google as a..."
                                                                type="text"
                                                                rows="4"
                                                            />
                                                            <ErrorMessage
                                                                name={`education.${eduindex}.edu`}
                                                                component="div"
                                                                className="field-error"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    <div className="block">
                                        <div className="flex justify-end m-2">
                                            <button
                                                type="button"
                                                className="customBtnCol px-4 py-2 rounded-sm"
                                                onClick={() =>
                                                    push({
                                                        eyears: "",
                                                        edu: "",
                                                    })
                                                }
                                            >
                                                Add education
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </FieldArray>

                        <Button
                            className="gap-x-2 customBtnCol m-4"
                            size="lg"
                            type="submit"
                        >
                            <RiSave3Fill />
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TopBar;
