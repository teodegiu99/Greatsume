
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Formik,
    Field,
    Form,
    ErrorMessage,
    FieldArray,
    FieldProps,
} from "formik";
import Select from "react-select";
import * as z from "zod";
import dynamic from "next/dynamic";

// Importa l'editor React Quill dinamicamente (disabilita SSR per evitare errori Window is not defined)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

// Icons
import { RiSave3Fill } from "react-icons/ri";
import {
    MdDelete,
    MdAdd,
    MdPerson,
    MdContactMail,
    MdWork,
    MdSchool,
    MdStars,
} from "react-icons/md";
// Components & Redux
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImageUploader";
import { StreamValues } from "../StreamValues";
import { getInitialData } from "@/data/InitialData";
import { resume, selectedTemplate } from "@/actions/resume";
import { FormSchema } from "@/schemas";
import { RootState } from "@/app/state/store";
import { setValue } from "../../../state/values/loaderCvDataSlice";

// --- TIPI E INTERFACCE ---
// Estendiamo FormSchema perché in schemas/index.ts manca "image" su FormSchema
type ResumeFormValues = z.infer<typeof FormSchema> & { image?: string | null };

// Stili riutilizzabili
const inputClasses =
    "w-full px-4 py-2 mt-1 border border-slate-300 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500";
const labelClasses = "block text-sm font-medium text-slate-700";

// Sotto-componente Card
const SectionCard = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) => (
    <div className="bg-white p-6 mb-6 mx-4 border border-slate-100 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
            {icon && <span className="primary">{icon}</span>}
            {title}
        </h3>
        {children}
    </div>
);

// Moduli dell'editor di testo per nascondere opzioni troppo complesse (teniamo solo bold, italic, list)
const quillModules = {
    toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
    ],
};

const LeftBar = () => {
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [isMounted, setIsMounted] = useState(false);

    const template = useSelector((state: RootState) => state.template.value);
    const templateArray = ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"];
    const templateIndex = Math.min(
        Math.max(template, 0),
        templateArray.length - 1,
    );

    const [inputValue, setInputValue] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [softInputValue, setSoftInputValue] = useState("");
    const [softSkills, setSoftSkills] = useState<string[]>([]);
    const [langInputValue, setLangInputValue] = useState("");
    const [langSkills, setLangSkills] = useState<string[]>([]);

    const [initialValues, setInitialValues] = useState<ResumeFormValues>({
        name: "",
        surname: "",
        address: "",
        dateOfBirth: "",
        relocation: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        dribble: "",
        website: "",
        bio: "",
        desiredJob: "",
        ral: "",
        experience: [{ years: "", title: "", exps: "" }],
        education: [{ eyears: "", etitle: "", edu: "" }],
        skillss: [""],
        softSkillss: [""],
        langSkillss: [""],
        image: "",
    });

    useEffect(() => {
        setIsMounted(true);
        const fetchInitialValues = async () => {
            const data = await getInitialData();
            if (data) {
                setInitialValues({
                    name: data.name || "",
                    surname: data.surname || "",
                    address: data.address || "",
                    dateOfBirth: data.dateOfBirth || "",
                    relocation: data.relocation || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    linkedin: data.linkedin || "",
                    github: data.github || "",
                    dribble: data.dribble || "",
                    website: data.website || "",
                    bio: data.bio || "",
                    desiredJob: data.desiredJob || "",
                    ral: data.ral || "",
                    experience: Array.isArray(data.experience)
                        ? data.experience
                        : [{ years: "", title: "", exps: "" }],
                    education: Array.isArray(data.education)
                        ? data.education
                        : [{ eyears: "", etitle: "", edu: "" }],
                    skillss: data.skillss || [""],
                    softSkillss: data.softSkillss || [""],
                    langSkillss: data.langSkillss || [""],
                    image: data.image || "",
                });
                setSkills(data.skillss || []);
                setSoftSkills(data.softSkillss || []);
                setLangSkills(data.langSkillss || []);
                dispatch(setValue(true));
            }
        };
        fetchInitialValues();
    }, [dispatch]);

    const SubmitHandler = (values: ResumeFormValues) => {
        setError("");
        startTransition(() => {
            selectedTemplate(templateArray[templateIndex]);
            resume(values)
                .then((data) => {
                    if (data?.error) setError(data.error);
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    const preventSubmit = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") event.preventDefault();
    };

    // Corretto l'errore TypeScript sull'evento Keyboard
    const handleAddSkill = (
        event: React.KeyboardEvent<HTMLElement>,
        value: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        inputSetter: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            if (value.trim() !== "") {
                setter((prev) => [...prev, value.trim()]);
                inputSetter("");
            }
        }
    };

    const removeSkill = (
        index: number,
        setter: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
        setter((prev) => prev.filter((_, idx) => idx !== index));
    };

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            borderColor: "#cbd5e1",
            borderRadius: "0.5rem",
            minHeight: "42px",
            boxShadow: "none",
            "&:hover": { borderColor: "#6366f1" },
        }),
    };

    const renderSkillBadges = (
        items: string[],
        setter: React.Dispatch<React.SetStateAction<string[]>>,
    ) => (
        <div className="flex flex-wrap mt-3 gap-2">
            {items.map((item, idx) => (
                <span
                    key={idx}
                    className="flex items-center px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full border border-violet-100 shadow-sm transition-all hover:shadow-md"
                >
                    {item}
                    <button
                        type="button"
                        onClick={() => removeSkill(idx, setter)}
                        className="ml-2 text-violet-400 hover:text-red-500 focus:outline-none"
                    >
                        <MdDelete size={16} />
                    </button>
                </span>
            ))}
        </div>
    );

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-10">
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={SubmitHandler}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="flex sticky top-0 bg-white/80 backdrop-blur-md justify-between items-center z-50 border-b border-slate-200 px-6 py-3 shadow-sm mb-6">
                            <h2 className="text-xl font-bold text-slate-800">
                                Build your resume
                            </h2>
                            <div className="flex items-center gap-4">
                                {error && (
                                    <span className="text-sm text-red-500 font-medium">
                                        {error}
                                    </span>
                                )}
                                <Button
                                    className="gap-x-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-sm"
                                    size="default"
                                    type="submit"
                                    disabled={isPending}
                                >
                                    <RiSave3Fill size={18} />
                                    Save Changes
                                </Button>
                            </div>
                        </div>

                        <div className="mx-4 mb-6">
                            <ImageUploader />
                        </div>

                        {/* PERSONALI E CONTATTI OMessI PER BREVITA', INSERISCI QUI LE SectionCard ESATTE DI PRIMA (Informazioni e contatti) */}
                        <SectionCard
                            title="Personal Informations"
                            icon={<MdPerson />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className={labelClasses}
                                    >
                                        Name
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        placeholder="Matteo"
                                        className={inputClasses}
                                        onKeyDown={preventSubmit}
                                        disabled={isPending}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="surname"
                                        className={labelClasses}
                                    >
                                        Surname
                                    </label>
                                    <Field
                                        id="surname"
                                        name="surname"
                                        placeholder="De Giuseppe"
                                        className={inputClasses}
                                        onKeyDown={preventSubmit}
                                        disabled={isPending}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="address"
                                        className={labelClasses}
                                    >
                                        Address
                                    </label>
                                    <Field
                                        id="address"
                                        name="address"
                                        placeholder="767 5th Ave, New York, NY 10153"
                                        className={inputClasses}
                                        onKeyDown={preventSubmit}
                                        disabled={isPending}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="dateOfBirth"
                                        className={labelClasses}
                                    >
                                        Date Of Birth
                                    </label>
                                    <Field
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        placeholder="07/28/1999"
                                        className={inputClasses}
                                        onKeyDown={preventSubmit}
                                        disabled={isPending}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="relocation"
                                        className={labelClasses}
                                    >
                                        Condition to relocate
                                    </label>
                                    <Field
                                        id="relocation"
                                        name="relocation"
                                        placeholder="Only in Switzerland"
                                        className={inputClasses}
                                        onKeyDown={preventSubmit}
                                        disabled={isPending}
                                    />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Contacts & Online Profile"
                            icon={<MdContactMail />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className={labelClasses}>
                                        Phone
                                    </label>
                                    <Field
                                        name="phone"
                                        placeholder="+39 123456789"
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="mail@example.com"
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        LinkedIn
                                    </label>
                                    <Field
                                        name="linkedin"
                                        placeholder="https://linkedin.com/in/..."
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        Github
                                    </label>
                                    <Field
                                        name="github"
                                        placeholder="https://github.com/..."
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        Dribbble
                                    </label>
                                    <Field
                                        name="dribble"
                                        placeholder="https://dribbble.com/..."
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        Website
                                    </label>
                                    <Field
                                        name="website"
                                        placeholder="https://..."
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-5 grid grid-cols-1 md:grid-cols-4 gap-5">
                                <div className="md:col-span-4">
                                    <label className={labelClasses}>Bio</label>
                                    {/* Integrazione Rich Text per la Bio */}
                                    <div className="bg-white mt-1 border border-slate-300 rounded-lg overflow-hidden">
                                        <Field name="bio">
                                            {({ field, form }: FieldProps) => (
                                                <ReactQuill
                                                    theme="snow"
                                                    modules={quillModules}
                                                    value={field.value || ""}
                                                    onChange={(content) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            content,
                                                        )
                                                    }
                                                    readOnly={isPending}
                                                    className="min-h-[150px]" // Altezza leggermente maggiore per la bio
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
                                <div className="md:col-span-3">
                                    <label className={labelClasses}>
                                        Desired Job Position
                                    </label>
                                    <Field
                                        name="desiredJob"
                                        placeholder="Frontend Developer"
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className={labelClasses}>RAL</label>
                                    <Field
                                        name="ral"
                                        placeholder="€ 50.000"
                                        className={inputClasses}
                                        disabled={isPending}
                                        onKeyDown={preventSubmit}
                                    />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Skills & Languages"
                            icon={<MdStars />}
                        >
                            <div className="grid grid-cols-1 gap-8">
                                <div>
                                    <label className={`${labelClasses} mb-2`}>
                                        Hard Skills
                                    </label>
                                    {isMounted ? (
                                        <Select
                                            instanceId="hard-skills"
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null,
                                            }}
                                            isMulti
                                            placeholder="Type and press Enter..."
                                            inputValue={inputValue}
                                            onInputChange={setInputValue}
                                            onKeyDown={(e) =>
                                                handleAddSkill(
                                                    e,
                                                    inputValue,
                                                    setSkills,
                                                    setInputValue,
                                                )
                                            }
                                            styles={selectStyles}
                                            menuIsOpen={false}
                                            isDisabled={isPending}
                                        />
                                    ) : (
                                        <div className="w-full h-[42px] border border-slate-300 rounded-lg bg-white animate-pulse"></div>
                                    )}
                                    {renderSkillBadges(skills, setSkills)}
                                </div>
                                <div>
                                    <label className={`${labelClasses} mb-2`}>
                                        Soft Skills
                                    </label>
                                    {isMounted ? (
                                        <Select
                                            instanceId="soft-skills"
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null,
                                            }}
                                            isMulti
                                            placeholder="Type and press Enter..."
                                            inputValue={softInputValue}
                                            onInputChange={setSoftInputValue}
                                            onKeyDown={(e) =>
                                                handleAddSkill(
                                                    e,
                                                    softInputValue,
                                                    setSoftSkills,
                                                    setSoftInputValue,
                                                )
                                            }
                                            styles={selectStyles}
                                            menuIsOpen={false}
                                            isDisabled={isPending}
                                        />
                                    ) : (
                                        <div className="w-full h-[42px] border border-slate-300 rounded-lg bg-white animate-pulse"></div>
                                    )}
                                    {renderSkillBadges(
                                        softSkills,
                                        setSoftSkills,
                                    )}
                                </div>
                                <div>
                                    <label className={`${labelClasses} mb-2`}>
                                        Languages
                                    </label>
                                    {isMounted ? (
                                        <Select
                                            instanceId="lang-skills"
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null,
                                            }}
                                            isMulti
                                            placeholder="Type and press Enter..."
                                            inputValue={langInputValue}
                                            onInputChange={setLangInputValue}
                                            onKeyDown={(e) =>
                                                handleAddSkill(
                                                    e,
                                                    langInputValue,
                                                    setLangSkills,
                                                    setLangInputValue,
                                                )
                                            }
                                            styles={selectStyles}
                                            menuIsOpen={false}
                                            isDisabled={isPending}
                                        />
                                    ) : (
                                        <div className="w-full h-[42px] border border-slate-300 rounded-lg bg-white animate-pulse"></div>
                                    )}
                                    {renderSkillBadges(
                                        langSkills,
                                        setLangSkills,
                                    )}
                                </div>
                            </div>
                        </SectionCard>

                        {/* ESPERIENZA - CON TEXTAREA AUTO RESIZING E RICH TEXT */}
                        <SectionCard title="Experience" icon={<MdWork />}>
                            <FieldArray name="experience">
                                {({ remove, push }) => (
                                    <div className="space-y-4">
                                        {/* Corretto il controllo undefined su values.experience */}
                                        {values.experience &&
                                            values.experience.length > 0 &&
                                            values.experience.map(
                                                (_, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative bg-slate-50 border border-slate-200 rounded-lg p-5"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm border border-slate-100"
                                                        >
                                                            <MdDelete
                                                                size={20}
                                                            />
                                                        </button>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                                                            <div>
                                                                <label
                                                                    className={
                                                                        labelClasses
                                                                    }
                                                                >
                                                                    Working
                                                                    Years
                                                                </label>
                                                                <Field
                                                                    name={`experience.${index}.years`}
                                                                    placeholder="2020 - 2024"
                                                                    className={
                                                                        inputClasses
                                                                    }
                                                                    disabled={
                                                                        isPending
                                                                    }
                                                                    onKeyDown={
                                                                        preventSubmit
                                                                    }
                                                                />
                                                                <ErrorMessage
                                                                    name={`experience.${index}.years`}
                                                                    component="div"
                                                                    className="text-red-500 text-xs mt-1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    className={
                                                                        labelClasses
                                                                    }
                                                                >
                                                                    Job Title
                                                                </label>
                                                                <Field
                                                                    name={`experience.${index}.title`}
                                                                    placeholder="Senior Frontend Developer"
                                                                    className={
                                                                        inputClasses
                                                                    }
                                                                    disabled={
                                                                        isPending
                                                                    }
                                                                    onKeyDown={
                                                                        preventSubmit
                                                                    }
                                                                />
                                                                <ErrorMessage
                                                                    name={`experience.${index}.title`}
                                                                    component="div"
                                                                    className="text-red-500 text-xs mt-1"
                                                                />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label
                                                                    className={
                                                                        labelClasses
                                                                    }
                                                                >
                                                                    Description
                                                                </label>
                                                                {/* REACT QUILL RICH TEXT EDITOR */}
                                                                {/* REACT QUILL RICH TEXT EDITOR */}
                                                                <div className="bg-white mt-1 border border-slate-300 rounded-lg overflow-hidden">
                                                                    <Field
                                                                        name={`experience.${index}.exps`}
                                                                    >
                                                                        {({
                                                                            field,
                                                                            form,
                                                                        }: FieldProps) => (
                                                                            <ReactQuill
                                                                                theme="snow"
                                                                                modules={
                                                                                    quillModules
                                                                                }
                                                                                value={
                                                                                    field.value ||
                                                                                    ""
                                                                                }
                                                                                onChange={(
                                                                                    content,
                                                                                ) =>
                                                                                    form.setFieldValue(
                                                                                        field.name,
                                                                                        content,
                                                                                    )
                                                                                }
                                                                                readOnly={
                                                                                    isPending
                                                                                }
                                                                                className="min-h-[100px]"
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </div>
                                                                <ErrorMessage
                                                                    name={`experience.${index}.exps`}
                                                                    component="div"
                                                                    className="text-red-500 text-xs mt-1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    years: "",
                                                    title: "",
                                                    exps: "",
                                                })
                                            }
                                            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-violet-200 text-violet-600 rounded-lg hover:bg-violet-50 hover:border-violet-300 transition-all font-medium"
                                        >
                                            <MdAdd size={20} /> Add Experience
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </SectionCard>

                        {/* EDUCAZIONE - CON TEXTAREA AUTO RESIZING E RICH TEXT */}
                        <SectionCard title="Education" icon={<MdSchool />}>
                            <FieldArray name="education">
                                {({ remove, push }) => (
                                    <div className="space-y-4">
                                        {/* Corretto il controllo undefined su values.education */}
                                        {values.education &&
                                            values.education.length > 0 &&
                                            values.education.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className="relative bg-slate-50 border border-slate-200 rounded-lg p-5"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm border border-slate-100"
                                                    >
                                                        <MdDelete size={20} />
                                                    </button>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                                                        <div>
                                                            <label
                                                                className={
                                                                    labelClasses
                                                                }
                                                            >
                                                                Year of
                                                                Graduation
                                                            </label>
                                                            <Field
                                                                name={`education.${index}.eyears`}
                                                                placeholder="2018 - 2021"
                                                                className={
                                                                    inputClasses
                                                                }
                                                                disabled={
                                                                    isPending
                                                                }
                                                                onKeyDown={
                                                                    preventSubmit
                                                                }
                                                            />
                                                            <ErrorMessage
                                                                name={`education.${index}.eyears`}
                                                                component="div"
                                                                className="text-red-500 text-xs mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                className={
                                                                    labelClasses
                                                                }
                                                            >
                                                                Degree / Title
                                                            </label>
                                                            <Field
                                                                name={`education.${index}.etitle`}
                                                                placeholder="Bachelor in Computer Science"
                                                                className={
                                                                    inputClasses
                                                                }
                                                                disabled={
                                                                    isPending
                                                                }
                                                                onKeyDown={
                                                                    preventSubmit
                                                                }
                                                            />
                                                            <ErrorMessage
                                                                name={`education.${index}.etitle`}
                                                                component="div"
                                                                className="text-red-500 text-xs mt-1"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label
                                                                className={
                                                                    labelClasses
                                                                }
                                                            >
                                                                Institution /
                                                                Details
                                                            </label>
                                                            {/* REACT QUILL RICH TEXT EDITOR */}
                                                            {/* REACT QUILL RICH TEXT EDITOR */}
                                                            <div className="bg-white mt-1 border border-slate-300 rounded-lg overflow-hidden">
                                                                <Field
                                                                    name={`education.${index}.edu`}
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <ReactQuill
                                                                            theme="snow"
                                                                            modules={
                                                                                quillModules
                                                                            }
                                                                            value={
                                                                                field.value ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                content,
                                                                            ) =>
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    content,
                                                                                )
                                                                            }
                                                                            readOnly={
                                                                                isPending
                                                                            }
                                                                            className="min-h-[100px]"
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                            <ErrorMessage
                                                                name={`education.${index}.edu`}
                                                                component="div"
                                                                className="text-red-500 text-xs mt-1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    eyears: "",
                                                    etitle: "",
                                                    edu: "",
                                                })
                                            }
                                            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-violet-200 text-violet-600 rounded-lg hover:bg-violet-50 hover:border-violet-300 transition-all font-medium"
                                        >
                                            <MdAdd size={20} /> Add Education
                                        </button>
                                    </div>
                                )}
                            </FieldArray>
                        </SectionCard>

                        <StreamValues
                            skills={skills}
                            softSkills={softSkills}
                            langSkills={langSkills}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LeftBar;
