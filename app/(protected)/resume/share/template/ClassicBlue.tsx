"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { useEffect, useRef, useState } from "react";
import { getInitialData } from "@/data/InitialData";
import { ResumeSchema } from "@/schemas";
import * as z from "zod"

const ClassicBlue = () => {
  const showHide = useSelector((state: RootState) => state.showHide);
  const [object, setObject] = useState<Partial<z.infer<typeof ResumeSchema>>>(); // Definisci lo stato per object

      
  useEffect(() => {
    const fetchPublicValues = async () => {
        try {
            const data = await getInitialData();
            if (data) {
             
              setObject(data);
                
            }
            console.log(data)
        
        } catch (error) {
            console.error("Error connecting to db ", error);
        }
    };

    fetchPublicValues();
}, []);

  return (
    <div className="h-full w-full flex justify-center overflow-auto scrollbar-hide">
      {/* <p>{object.address}</p> */}

      <div className="a4f shadow-lg  ">
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 bg-[#1c2863] p-3 w-full text-white">
           {object?.image && showHide?.showImage &&
            <div className="flex justify-center w-full mb-4">
              <img
                id="cvImage"
                className="max-w-[75%] rounded-full"
                src={`${object?.image}`}
              />
            </div>}

            <div className="flex justify-start flex-col">
              {(object?.address || object?.dateOfBirth) && (showHide?.showAddress || showHide?.showDateOfBirth) && (
                <>
                  <p className="cvTitle-ClassicBlue">Personal Information</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {object?.address && showHide?.showAddress &&(
                <>
                  <p className="cvSubTitle-ClassicBlue">Address</p>
                  <p className="cvData-ClassicBlue">{object?.address}</p>
                </>
              )}
              {object?.dateOfBirth && showHide?.showDateOfBirth &&(
                <>
                  <p className="cvSubTitle-ClassicBlue">Date Of Birth</p>
                  <p className="cvData-ClassicBlue">{object?.dateOfBirth}</p>
                </>
              )}
              {object?.relocation && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Condition to relocate</p>
                  <p className="cvData-ClassicBlue">{object?.relocation}</p>
                </>
              )}
            </div>
            <div className="flex justify-start flex-col">
              {(object?.email ||
                object?.phone ||
                object?.linkedin ||
                object?.github ||
                object?.dribble ||
                object?.website) && (
                <>
                  <p className="cvTitle-ClassicBlue">Contacts</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {object?.email && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Email</p>
                  <p className="cvData-ClassicBlue">{object?.email}</p>{" "}
                </>
              )}
              {object?.phone && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Phone number</p>
                  <p className="cvData-ClassicBlue">{object.phone}</p>
                </>
              )}
              {object?.linkedin && (
                <>
                  <p className="cvSubTitle-ClassicBlue">LinkedIn</p>
                  <p className="cvData-ClassicBlue">{object?.linkedin}</p>
                </>
              )}
              {object?.github && (
                <>
                  <p className="cvSubTitle-ClassicBlue">GitHub</p>
                  <p className="cvData-ClassicBlue">{object?.github}</p>
                </>
              )}
              {object?.dribble && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Dribble</p>
                  <p className="cvData-ClassicBlue">{object?.dribble}</p>
                </>
              )}
              {object?.website && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Personal Website</p>
                  <p className="cvData-ClassicBlue">{object?.website}</p>
                </>
              )}
            </div>
            {(object?.skillss &&  object?.skillss.length > 0) &&(
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.skillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue" key={index}>
                       {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(object?.softSkillss && object?.softSkillss.length > 0) && (
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Soft Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.softSkillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue" key={index}>
                      {" "}
                       {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(object?.langSkillss && object?.langSkillss.length > 0) &&(
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Languages</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.langSkillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue" key={index}>
                      {" "}
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="col-span-2 p-3 w-full h-full bg-white text-black">
            <div className="flex justify-start flex-col">
              <h1 className="cvMainTitle-ClassicBlue">
                {object?.name} {object?.surname}
              </h1>
              {object?.desiredJob && <h2 className="cvMainSub-ClassicBlue">{object?.desiredJob}</h2>}
              {object?.bio && showHide?.showBio && <p className="cvData-ClassicBlue text-justify">{object?.bio}</p>}
            </div>
            {object?.experience && (object?.experience.length > 0) &&(
              <div>
                <h2 className="cvMainSub-ClassicBlue">Experience</h2>
                <hr className="mb-2 border-t-1 border-slate-400"></hr>
                {object?.experience.map((exp, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row justify-between pb-1"
                    >
                      <p className="cvSubTitle-ClassicBlue">{exp.title}</p>
                      <p className="cvSubTitle-ClassicBlue">{exp.years}</p>
                    </div>
                    <div>
                      <p className="cvData-ClassicBlue pb-2 text-justify">{exp.exps}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {object?.education && (object?.education.length > 0) &&(
              <div>
                <h2 className="cvMainSub-ClassicBlue">Education</h2>
                <hr className="mb-2 border-t-1 border-slate-400"></hr>
                {object?.education.map((edu, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row justify-between pb-1"
                    >
                      <p className="cvSubTitle-ClassicBlue">{edu.etitle}</p>
                      <p className="cvSubTitle-ClassicBlue">{edu.eyears}</p>
                    </div>
                    <div>
                      <p className="cvData-ClassicBlue pb-2 text-justify">{edu.edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicBlue;
