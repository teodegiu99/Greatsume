"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { useEffect, useState } from "react";
import { PublicSchema } from "@/schemas";
import * as z from "zod"
import { getPublicData } from "@/data/getPublicData";


interface ElegantBlackProps {
  selectedTemplate: string;
  publicLink: string;

}

const ElegantBlack: React.FC<ElegantBlackProps> = ({
  publicLink
}) => { 
  const showHide = useSelector((state: RootState) => state.showHidePublic);
  const [object, setObject] = useState<Partial<z.infer<typeof PublicSchema>>>(); // Definisci lo stato per object

  useEffect(() => {
    const fetchPublicValues = async () => {
        try {
            const data = await getPublicData(publicLink);
            if (data) {

              setObject(data)
                
            }
            console.log(data)
        
        } catch (error) {
            console.error("Error connecting to db ", error);
        }
    };

    fetchPublicValues();
}, []);

  return (
    <div className="w-full flex justify-center overflow-auto scrollbar-hide">
      {/* <p>{object.address}</p> */}

      <div className="a4f h-full text-black w-full bg-white p-6">
        <div className="flex flex-col items-center">
          {(object?.name || object?.surname) && <p className="cvMainTitle-ElegantBlack">
            {object?.name} {object?.surname}
          </p>}
          {object?.desiredJob  && <p className="font-medium text-[22px]">{object?.desiredJob}</p>}
          {object?.address && showHide.showAddress  && <p className="cvDataTitle-ElegantBlack mb-2">{object?.address}</p>}
          {object?.dateOfBirth && showHide.showDateOfBirth  && <p className="cvDataTitle-ElegantBlack mb-2">{object?.dateOfBirth}</p>}

          <div className="flex justify-between  w-full mb-1">
          {object?.phone  &&<p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center">
              <BsFillTelephoneFill />
              {object?.phone}
            </p>}

            {object?.email  && <p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center">
              <IoMail />
              {object?.email}
            </p>}
            {/* <p className="cvDataTitle-ElegantBlack">{object?.website}</p> */}
          </div>

          <hr className="border w-full border-black mb-3" />
        </div>
        {(object?.bio || object?.ral || object?.relocation ) &&<div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Profile</p>
        </div>}
        <div>
        {object?.bio && showHide.showBio && <p className="cvData-ElegantBlack mb-2">{object?.bio}</p>}
          <div className="flex justify-between  w-full">
          {object?.relocation  && <p className="cvDataTitle-ElegantBlack">
              <span className="font-medium">Condition to relocate: </span>
              {object?.relocation}
            </p>}
            {object?.ral  &&<p className="cvDataTitle-ElegantBlack mb-2">
              <span className="font-medium">Desired Ral: </span>
              {object?.ral}
            </p>}
          </div>
        </div>
        {object?.experience && object?.experience.length > 0 && <>
        <div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Employment History</p>
        </div>
        {object?.experience.map((exp, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between pb-1">
              <p className="cvDataTitle-ElegantBlack">{exp.title}</p>
              <p className="cvDataTitle-ElegantBlack">{exp.years}</p>
            </div>
            <div>
              <p className="cvData-ElegantBlack mb-2">{exp.exps}</p>
            </div>
          </div>
        ))}
        </>}
        {object?.education && object?.education.length > 0 && <>
        <div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Education</p>
        </div>
        {object?.education.map((edu, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between pb-1">
              <p className="cvDataTitle-ElegantBlack">{edu.etitle}</p>
              <p className="cvDataTitle-ElegantBlack">{edu.eyears}</p>
            </div>
            <div>
              <p className="cvData-ElegantBlack mb-2">{edu.edu}</p>
            </div>
          </div>
        ))}</>}
        {((object?.softSkillss && object?.softSkillss.length > 0) || (object?.skillss && object?.skillss.length > 0) || (object?.langSkillss && object?.langSkillss.length > 0) || (object?.website || object?.linkedin || object?.github || object?.dribble)) && <div className="cvSeparator-div-ElegantBlack h-[28px]"></div>}
        
        {(object?.skillss && object?.skillss.length > 0) &&
        <> <div className="flex  w-full mb-2 items-center flex-wrap">
          <p className="cvSkillsTitle-ElegantBlack mr-4">Skills:</p>
          {object?.skillss.map((skill, index) => (
            <p className="cvSkills-ElegantBlack mr-4" key={index}>
              {skill}
            </p>
          ))}
        </div>
        <hr className="border-1 w-full border-gray-300 mb-3" />
        </>}
        {(object?.softSkillss && object?.softSkillss.length > 0) && <>
        <div className="flex  w-full mb-2 items-center flex-wrap">
          <p className="cvSkillsTitle-ElegantBlack mr-4">Soft skills:</p>
          {object?.softSkillss.map((skill, index) => (
            <p className="cvSkills-ElegantBlack" key={index}>
             {skill}
            </p>
          ))}
        </div>
        <hr className="border-1 w-full  border-gray-300 mb-3" />
</> }
{(object?.langSkillss && object?.langSkillss.length > 0) && <>
        <div className="flex  w-full mb-2 items-center flex-wrap ">
          <p className="cvSkillsTitle-ElegantBlack mr-4">Languages:</p>

          {object?.langSkillss.map((skill, index) => (
            <p className="cvSkills-ElegantBlack" key={index}>
              {skill}
            </p>
          ))}
        </div>
        <hr className="border-1 w-full border-gray-300 mb-3" />
        </>}
        <div className="flex w-full mb-2 items-center flex-wrap">
          {(object?.website || object?.dribble || object?.github || object?.linkedin) &&<p className="cvSkillsTitle-ElegantBlack mr-4">
            Professional profiles:
          </p>}
          {object?.website && <p className="cvSkills-ElegantBlack flex items-center mr-4">
            <CgWebsite />
            &nbsp;{object?.website}
          </p>}
          {object?.linkedin &&<p className="cvSkills-ElegantBlack flex items-center mr-4">
            <FaLinkedin />
            &nbsp;{object?.linkedin}
          </p>}
         {object?.github && <p className="cvSkills-ElegantBlack flex items-center mr-4">
            <FaGithub />
            &nbsp;{object?.github}
          </p>}
          {object?.dribble && <p className="cvSkills-ElegantBlack flex items-center">
            <FaDribbble />
            &nbsp;{object?.dribble}
          </p>}
        </div>
      </div>
    </div>
  );
};
export default ElegantBlack;
