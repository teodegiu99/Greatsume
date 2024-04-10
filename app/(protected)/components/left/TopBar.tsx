"use client";
import { Button } from "@/components/ui/button";
import { RiSave3Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { resume } from "@/actions/resume";
import { useState } from "react";
import Select from 'react-select';

const TopBar = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            if (inputValue.trim() !== '') {
                setSkills(prevSkills => [...prevSkills, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const handleDeleteSkill = (index: number) => {
        setSkills(prevSkills => prevSkills.filter((_, idx) => idx !== index));
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '38px',
            '&:hover': {
                border: '1px solid #ccc',
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
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    values.skillss = [...skills]
                    console.log(values);
                    resume(values);
                }}
            >
                {({  values, setFieldValue  }) => (
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

       


                        <Field
                            name="skills"
                            render={({ props }) => (
                                <div>
                                    <Select
                                        {...props}
                                        options={[]}
                                        isMulti
                                        placeholder="Seleziona o inserisci una skill"
                                        inputValue={inputValue}
                                        onInputChange={(value) => setInputValue(value)}
                                        onKeyDown={handleKeyDown}
                                        styles={customStyles}
                                        menuIsOpen={false}
                                    />
                                    <div className="flex  p-2 mt-2">
                                        {skills.map((skill, index) => (
                                            <div className="border-2 border-slate-300">
                                            <div
                                                key={index}
                                                className="flex "
                                            >
                                                {skill}
                                                <button
                                                    onClick={() => handleDeleteSkill(index)}
                                                    className="mr-2 text-red-500 "
                                                >
                                                    <MdDelete />

                                                </button>
                                            </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>

)}
/>




                        <h3 className="text-start m-4 formTitle">
                            Personal Informations
                        </h3>
                        <div className="grid grid-cols-2 gap-4  p-4 m-2 border-2 border-slate-200 rounded-md">
                            <div>
                                <label htmlFor="name" className="formLabel">
                                    Name
                                </label>
                                <Field
                                    name="name"
                                    placeholder="Matteo"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div>
                                <label htmlFor="surname" className="formLabel">
                                    Surname
                                </label>
                                <Field
                                    name="surname"
                                    placeholder="De Giuseppe"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address" className="formLabel ">
                                    Address
                                </label>
                                <Field
                                    name="address"
                                    placeholder="767 5th Ave, New York, NY 10153, United States"
                                    type="text"
                                    className="inputField"
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
                                    name="dateOfBirth"
                                    placeholder="07/28/1999"
                                    type="text"
                                    className="inputField"
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
                                    name="phone"
                                    placeholder="+39 123456789"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="formLabel">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    placeholder="mail@example.com"
                                    type="email"
                                    className="inputField"
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
                                    name="linkedin"
                                    placeholder="https://Linkedin.com/yourName"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div>
                                <label htmlFor="github" className="formLabel">
                                    Github
                                </label>
                                <Field
                                    name="github"
                                    placeholder="https://github.com/teodegiu99"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div>
                                <label htmlFor="dribble" className="formLabel">
                                    Dribble
                                </label>
                                <Field
                                    name="dribble"
                                    placeholder="https://dribble.com/asYouCanSeeImNotADesigner"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="formLabel">
                                    Website
                                </label>
                                <Field
                                    name="website"
                                    placeholder="https://matteodegiuseppe.com"
                                    type="text"
                                    className="inputField"
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
                                    name="desiredJob"
                                    placeholder="Frontend Developer"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="ral" className="formLabel ">
                                    RAL
                                </label>
                                <Field
                                    name="ral"
                                    placeholder="€200000"
                                    type="text"
                                    className="inputField"
                                />
                            </div>
                        </div>
                        <h3 className="text-start m-4 formTitle">Experience</h3>

                        <FieldArray name="experience">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.experience.length > 0 &&
                                        values.experience.map((exp, expindex) => (
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
                                                                remove(expindex)
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
                                                            name={`experience.${expindex}.years`}
                                                            placeholder="2020-2024"
                                                            type="text"
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
                                        ))}
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
                                        values.education.map((edu, eduindex) => (
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
                                                                remove(eduindex)
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
                                                            name={`education.${eduindex}.eyears`}
                                                            placeholder="2020-2024"
                                                            type="text"
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
                                        ))}
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
