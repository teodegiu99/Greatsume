"use client";

import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { TemplateBaseProps } from "@/types/template";

export const ElegantBlackBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {

  return (
   <div className="h-full w-full text-black bg-white p-6 min-h-full " id="cv-ready">
      <div className="flex flex-col items-center">
       
          {(data?.name || data?.surname) && <p className="cvMainTitle-ElegantBlack">
            {data?.name} {data?.surname}
          </p>}
          {data?.desiredJob  && <p className="font-medium text-[22px]">{data?.desiredJob}</p>}
          {data?.address && showHide?.showAddress && <p className="cvDataTitle-ElegantBlack mb-2">{data?.address}</p>}
          {data?.dateOfBirth && showHide?.showDateOfBirth && <p className="cvDataTitle-ElegantBlack mb-2">{data?.dateOfBirth}</p>}

          <div className="flex justify-between  w-full mb-1">
          {data?.phone  &&<p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center">
              <BsFillTelephoneFill />
              {data?.phone}
            </p>}

            {data?.email  && <p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center">
              <IoMail />
              {data?.email}
            </p>}
            {/* <p className="cvDataTitle-ElegantBlack">{data?.website}</p> */}
          </div>

          <hr className="border w-full border-black mb-3" />
        </div>
        {((data?.bio && showHide?.showBio) || data?.ral || data?.relocation ) &&<div className="cvSeparator-div-ElegantBlack">
     </div>}
        <div>
        {data?.bio && showHide?.showBio &&<div 
  className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
  dangerouslySetInnerHTML={{ __html: data.bio || "" }} 
/>   }
          <div className="flex justify-between  w-full mt-2">
          {data?.relocation  && <p className="cvDataTitle-ElegantBlack">
              <span className="font-medium ">Condition to relocate: </span>
              {data?.relocation}
            </p>}
            {data?.ral  &&<p className="cvDataTitle-ElegantBlack mb-2">
              <span className="font-medium">Desired Ral: </span>
              {data?.ral}
            </p>}
          </div>
        </div>
        {data?.experience && data?.experience.length > 0 && <>
        <div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Employment History</p>
        </div>
        {data?.experience.map((exp, index) => (
          <div key={index} className="paginate-item mb-4">
            <div className="flex flex-row justify-between pb-1">
              <p className="cvDataTitle-ElegantBlack">{exp.title}</p>
              <p className="cvDataTitle-ElegantBlack">{exp.years}</p>
            </div>
            <div>
<div 
  className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
  dangerouslySetInnerHTML={{ __html: exp.exps || "" }} 
/>            </div>
          </div>
        ))}
        </>}
        {data?.education && data?.education.length > 0 && <>
        <div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Education</p>
        </div>
        {data?.education.map((edu, index) => (
          <div key={index} className="paginate-item mb-4">
            <div className="flex flex-row justify-between pb-1">
              <p className="cvDataTitle-ElegantBlack">{edu.etitle}</p>
              <p className="cvDataTitle-ElegantBlack">{edu.eyears}</p>
            </div>
            <div>
<div 
  className="... quill-content" // Aggiungi la classe quill-content per gli stili delle liste/grassetti
  dangerouslySetInnerHTML={{ __html: edu.edu || "" }} 
/>            </div>
          </div>
        ))}</>}
        {((data?.softSkillss && data?.softSkillss.length > 0) || (data?.skillss && data?.skillss.length > 0) || (data?.langSkillss && data?.langSkillss.length > 0) || (data?.website || data?.linkedin || data?.github || data?.dribble)) && <div className="cvSeparator-div-ElegantBlack h-[28px]"></div>}
        {/* <div className="grid grid-cols-2">
          <div className="flex justify-between">
            <div className="flex-1">
              {data?.skillss
                .slice(0, Math.ceil(data?.skillss.length / 2))
                .map((skill, index) => (
                  <p className="mr-4" key={index}>
                    • &nbsp;{skill}
                  </p>
                ))}
            </div>
            <div className="flex-1">
              {data?.skillss
                .slice(Math.ceil(data?.skillss.length / 2))
                .map((skill, index) => (
                  <p className="mr-4" key={index}>
                    • &nbsp;{skill}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-1">
              {data?.softSkillss
                .slice(0, Math.ceil(data?.softSkillss.length / 2))
                .map((skill, index) => (
                  <p className="mr-4" key={index}>
                    • &nbsp;{skill}
                  </p>
                ))}
            </div>
            <div className="flex-1">
              {data?.softSkillss
                .slice(Math.ceil(data?.softSkillss.length / 2))
                .map((skill, index) => (
                  <p className="mr-4" key={index}>
                    • &nbsp;{skill}
                  </p>
                ))}
            </div>
          </div>
        </div> */}
     {(data?.skillss && data?.skillss.length > 0) &&
  <div className="paginate-item w-full"> {/* <--- METTI QUESTO AL POSTO DI <> */}
    <div className="flex w-full mb-2 items-center flex-wrap">
      <p className="cvSkillsTitle-ElegantBlack mr-4">Skills:</p>
      {data?.skillss.map((skill, index) => (
        <p className="cvSkills-ElegantBlack mr-4" key={index}>
          {skill}
        </p>
      ))}
    </div>
    <hr className="border-1 w-full border-gray-300 mb-3" />
  </div>
}
 {(data?.softSkillss && data?.softSkillss.length > 0) && 
  <div className="paginate-item w-full"> {/* <--- METTI QUESTO AL POSTO DI <> */}
    <div className="flex w-full mb-2 items-center flex-wrap">
      <p className="cvSkillsTitle-ElegantBlack mr-4">Soft skills:</p>
      {data?.softSkillss.map((skill, index) => (
        <p className="cvSkills-ElegantBlack mr-4" key={index}>
         {skill}
        </p>
      ))}
    </div>
    <hr className="border-1 w-full border-gray-300 mb-3" />
  </div>
}
{(data?.langSkillss && data?.langSkillss.length > 0) && 
  <div className="paginate-item w-full"> {/* <--- METTI QUESTO AL POSTO DI <> */}
    <div className="flex w-full mb-2 items-center flex-wrap">
      <p className="cvSkillsTitle-ElegantBlack mr-4">Languages:</p>
      {data?.langSkillss.map((skill, index) => (
        <p className="cvSkills-ElegantBlack mr-4" key={index}>
          {skill}
        </p>
      ))}
    </div>
    <hr className="border-1 w-full border-gray-300 mb-3" />
  </div>
}
        <div className="flex w-full mb-2 items-center flex-wrap">
          {(data?.website || data?.dribble || data?.github || data?.linkedin) &&<p className="cvSkillsTitle-ElegantBlack mr-4">
            Professional profiles:
          </p>}
          {data?.website && <p className="cvSkills-ElegantBlack flex items-center mr-4">
            <CgWebsite />
            &nbsp;{data?.website}
          </p>}
          {data?.linkedin &&<p className="cvSkills-ElegantBlack flex items-center mr-4">
            <FaLinkedin />
            &nbsp;{data?.linkedin}
          </p>}
         {data?.github && <p className="cvSkills-ElegantBlack flex items-center mr-4">
            <FaGithub />
            &nbsp;{data?.github}
          </p>}
          {data?.dribble && <p className="cvSkills-ElegantBlack flex items-center">
            <FaDribbble />
            &nbsp;{data?.dribble}
          </p>}
        </div>
      </div>
  );
};
