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
  useFormikContext,
} from "formik";
import { resume } from "@/actions/resume";
import React, { useState, useId, useEffect, useTransition } from "react";
import Select from "react-select";
import { getInitialData } from "@/data/InitialData";
import { FormSchema } from "@/schemas";
import * as z from "zod";
import { StreamValues } from "../StreamValues";
import { Label } from '@/components/ui/label';
import ImageUploader from "./ImageUploader";

const LeftBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [softInputValue, setSoftInputValue] = useState<string>("");
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [langInputValue, setLangInputValue] = useState<string>("");
  const [langSkills, setLangSkills] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setSkills((prevSkills) => [...prevSkills, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleLangKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (langInputValue.trim() !== "") {
        setLangSkills((prevLangSkills) => [
          ...prevLangSkills,
          langInputValue.trim(),
        ]);
        setLangInputValue("");
      }
    }
  };

  const preventSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSoftKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleDeleteLangSkill = (index: number) => {
    setLangSkills((prevLangSkills) =>
      prevLangSkills.filter((_, idx) => idx !== index)
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

  const [initialValues, setInitialValues] = useState({
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
    experience: [
      {
        years: "",
        title: "",
        exps: "",
      },
    ],
    education: [
      {
        eyears: "",
        etitle: "",
        edu: "",
      },
    ],
    skillss: [""],
    softSkillss: [""],
    langSkillss: [""],
    image: ""
  });

  useEffect(() => {
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
          experience: data.experience || "",
          education: data.education || "",
          skillss: data.skillss || [""],
          softSkillss: data.softSkillss || [""],
          langSkillss: data.langSkillss || [""],
          image: data.image || "",
        });
        setSkills(data.skillss || [""]);
        setSoftSkills(data.softSkillss || [""]);
        setLangSkills(data.langSkillss || [""]);
      }
    };

    fetchInitialValues();
  }, []);

  const SubmitHandler = (values: z.infer<typeof FormSchema>) => {
    // const updatedValues = {
    //   ...values,
    //   skillss: [...skills],
    //   softSkillss: [...softSkills],
    //   langSkillss: [...langSkills],
    // };

    console.log(values);
    setError("");

    startTransition(() => {
      
      resume(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={SubmitHandler}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <div className="flex sticky top-0 bg-[#f8f8ff] justify-between items-center z-50 border-b-2 border-slate-200 ">
              <h3 className="text-start m-4 formTitle">Build your resume</h3>
              <Button
                className="gap-x-2 customBtnCol m-4"
                size="lg"
                type="submit"
                disabled={isPending}
              >
                <RiSave3Fill />
                Save
              </Button>
            </div>
<ImageUploader />
            <h3 className="text-start m-4 formTitle">Personal Informations</h3>
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="formLabel">
                  Date Of Birth
                </label>
                <Field
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="07/28/1999"
                  type="text"
                  className="inputField"
                  onKeyDown={preventSubmit}
                  disabled={isPending}
                />
              </div>
              <div>
                <label htmlFor="relocation" className="formLabel ">
                  Willing to relocate?
                </label>
                <Field
                  as="select"
                  id="relocation"
                  name="relocation"
                  multiple={false}
                  className="inputField"
                  // onChange={handleRelocate}
                >
                  <option value={undefined}>Choose an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
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
                  disabled={isPending}
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
                  disabled={isPending}
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="formLabel ">
                  LinkedIn
                </label>
                <Field
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://Linkedin.com/yourName"
                  type="text"
                  className="inputField"
                  onKeyDown={preventSubmit}
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="desiredJob" className="formLabel">
                  Desired Job Position
                </label>
                <Field
                  id="desiredJob"
                  name="desiredJob"
                  placeholder="Frontend Developer"
                  type="text"
                  className="inputField"
                  onKeyDown={preventSubmit}
                  disabled={isPending}
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
                  disabled={isPending}
                />
              </div>
            </div>
            <h3 className="text-start m-4 formTitle">Hard Skills</h3>
            <div className="p-4 m-2 border-2 border-slate-200 rounded-md">
              <Field name="skills" instanceId={useId()} disabled={isPending}>
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
                      onInputChange={(value) => setInputValue(value)}
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
                          <div key={index} className="flex p-2 ">
                            {skill}
                            <button
                              onClick={() => handleDeleteSkill(index)}
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
            <h3 className="text-start m-4 formTitle">Soft Skills</h3>

            <div className="p-4 m-2 border-2 border-slate-200 rounded-md">
              <Field
                name="softSkills"
                instanceId={useId()}
                disabled={isPending}
              >
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
                      onInputChange={(value) => setSoftInputValue(value)}
                      onKeyDown={handleSoftKeyDown}
                      styles={customStyles}
                      menuIsOpen={false}
                    />
                    <div className="flex flex-wrap p-2 mt-2 gap-x-2">
                      {softSkills.map((softSkill, softindex) => (
                        <div
                          className="ring-1 rounded-sm ring-slate-200"
                          key={softindex}
                        >
                          <div key={softindex} className="flex  p-2">
                            {softSkill}
                            <button
                              onClick={() => handleDeleteSoftSkill(softindex)}
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
            <h3 className="text-start m-4 formTitle">Languages</h3>
            <div className="p-4 m-2 border-2 border-slate-200 rounded-md">
              <Field name="languages" instanceId={useId()} disabled={isPending}>
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
                      placeholder="Which languages do you know?"
                      inputValue={langInputValue}
                      onInputChange={(value) => setLangInputValue(value)}
                      onKeyDown={handleLangKeyDown}
                      styles={customStyles}
                      menuIsOpen={false}
                    />
                    <div className="flex flex-wrap p-2 mt-2 gap-x-2">
                      {langSkills.map((lang, lindex) => (
                        <div
                          className="ring-1 rounded-sm ring-slate-200"
                          key={lindex}
                        >
                          <div key={lindex} className="flex p-2 ">
                            {lang}
                            <button
                              onClick={() => handleDeleteLangSkill(lindex)}
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
                              onClick={() => remove(expindex)}
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
                              disabled={isPending}
                            />
                            <ErrorMessage
                              name={`experience.${expindex}.years`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <label
                            htmlFor={`experience.${expindex}.title`}
                            className="formLabel"
                          >
                            Experience title
                          </label>
                          <div className="col">
                            <Field
                              className="inputFieldArray"
                              id={`experience.${expindex}.title`}
                              name={`experience.${expindex}.title`}
                              placeholder="Frontend developer"
                              type="text"
                              onKeyDown={preventSubmit}
                              disabled={isPending}
                            />
                            <ErrorMessage
                              name={`experience.${expindex}.title`}
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
                              disabled={isPending}
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
                            title: "",
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
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="p-1"
                              onClick={() => remove(eduindex)}
                            >
                              <MdDelete className="w-5 h-5 text-red-500" />
                            </button>
                          </div>
                          <div className="col">
                            <label
                              htmlFor={`education.${eduindex}.eyears`}
                              className="formLabel"
                            >
                              Year of graduation
                            </label>
                            <Field
                              className="inputFieldArray"
                              id={`education.${eduindex}.eyears`}
                              name={`education.${eduindex}.eyears`}
                              placeholder="2020-2024"
                              type="text"
                              onKeyDown={preventSubmit}
                              disabled={isPending}
                            />
                            <ErrorMessage
                              name={`education.${eduindex}.eyears`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label
                              htmlFor={`education.${eduindex}.etitle`}
                              className="formLabel"
                            >
                              Education title
                            </label>
                            <Field
                              className="inputFieldArray"
                              id={`education.${eduindex}.etitle`}
                              name={`education.${eduindex}.etitle`}
                              placeholder="2020-2024"
                              type="text"
                              onKeyDown={preventSubmit}
                              disabled={isPending}
                            />
                            <ErrorMessage
                              name={`education.${eduindex}.etitle`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label
                              htmlFor={`education.${eduindex}.edu`}
                              className="formLabel"
                            >
                              Education
                            </label>
                            <Field
                              as="textarea"
                              id={`education.${eduindex}.edu`}
                              className="textArea"
                              name={`education.${eduindex}.edu`}
                              placeholder="I've worked for google as a..."
                              type="text"
                              rows="4"
                              disabled={isPending}
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
                          push({ eyears: "", edu: "", etitle: "" })
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
              disabled={isPending}
            >
              <RiSave3Fill />
              Save
            </Button>
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
